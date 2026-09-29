'use client';

import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react';
import type { CartItem, CartLineOptions } from '@/types/order';

// Bump the suffix whenever menu ids or prices change, so stale baskets are dropped
// instead of showing prices the stores no longer charge.
const STORAGE_KEY = 'pinpin-order-cart-v2';

interface CartState {
  storeId: string | null;
  slot: string | null;
  items: CartItem[];
  hydrated: boolean;
}

type CartAction =
  | { type: 'hydrate'; payload: Omit<CartState, 'hydrated'> }
  | { type: 'setStore'; storeId: string }
  | { type: 'setSlot'; slot: string | null }
  | { type: 'addItem'; item: CartItem }
  | { type: 'updateQuantity'; cartItemId: string; quantity: number }
  | { type: 'removeItem'; cartItemId: string }
  | { type: 'clear' };

const initialState: CartState = { storeId: null, slot: null, items: [], hydrated: false };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'hydrate':
      return { ...action.payload, hydrated: true };
    case 'setStore':
      // Switching stores invalidates the slot and cart — menus/hours differ per store.
      if (action.storeId === state.storeId) return state;
      return { ...state, storeId: action.storeId, slot: null, items: [] };
    case 'setSlot':
      return { ...state, slot: action.slot };
    case 'addItem':
      return { ...state, items: [...state.items, action.item] };
    case 'updateQuantity':
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.cartItemId !== action.cartItemId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartItemId === action.cartItemId ? { ...i, quantity: action.quantity } : i
        ),
      };
    case 'removeItem':
      return { ...state, items: state.items.filter((i) => i.cartItemId !== action.cartItemId) };
    case 'clear':
      return { ...state, slot: null, items: [] };
    default:
      return state;
  }
}

function newCartItemId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `cart-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

interface CartContextValue {
  storeId: string | null;
  slot: string | null;
  items: CartItem[];
  hydrated: boolean;
  totalTwd: number;
  itemCount: number;
  setStore: (storeId: string) => void;
  setSlot: (slot: string | null) => void;
  addItem: (input: { itemId: string; quantity: number; options: CartLineOptions; unitPriceTwd: number }) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hydrate from localStorage after mount only — keeps server and first client
  // render identical (empty cart), avoiding a hydration mismatch.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Omit<CartState, 'hydrated'>;
        dispatch({ type: 'hydrate', payload: parsed });
        return;
      }
    } catch {
      // Corrupt or inaccessible storage — fall through to an empty, hydrated cart.
    }
    dispatch({ type: 'hydrate', payload: { storeId: null, slot: null, items: [] } });
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    const { storeId, slot, items } = state;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ storeId, slot, items }));
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const totalTwd = state.items.reduce((sum, i) => sum + i.unitPriceTwd * i.quantity, 0);
    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);

    return {
      storeId: state.storeId,
      slot: state.slot,
      items: state.items,
      hydrated: state.hydrated,
      totalTwd,
      itemCount,
      setStore: (storeId) => dispatch({ type: 'setStore', storeId }),
      setSlot: (slot) => dispatch({ type: 'setSlot', slot }),
      addItem: (input) => dispatch({ type: 'addItem', item: { ...input, cartItemId: newCartItemId() } }),
      updateQuantity: (cartItemId, quantity) => dispatch({ type: 'updateQuantity', cartItemId, quantity }),
      removeItem: (cartItemId) => dispatch({ type: 'removeItem', cartItemId }),
      clear: () => dispatch({ type: 'clear' }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
