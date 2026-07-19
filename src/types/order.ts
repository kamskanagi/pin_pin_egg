export interface OptionChoice {
  key: string;
  labelZh: string;
  labelEn: string;
  labelJa: string;
  priceDeltaTwd?: number;
}

export interface OptionGroup {
  key: string;
  labelZh: string;
  labelEn: string;
  labelJa: string;
  required: boolean;
  multiple: boolean;
  choices: OptionChoice[];
}

/** Selected choice keys per option group key, e.g. { sweetness: ['half'], toppings: ['boba', 'pudding'] } */
export type CartLineOptions = Record<string, string[]>;

export interface CartItem {
  cartItemId: string;
  itemId: string;
  quantity: number;
  options: CartLineOptions;
  unitPriceTwd: number;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export type EInvoiceType = 'donate' | 'mobile_carrier' | 'business';

export interface CheckoutDetails {
  name: string;
  phone: string;
  einvoiceType: EInvoiceType;
  einvoiceValue?: string;
}

export type OrderStatus = 'pending_payment' | 'paid' | 'failed' | 'ready' | 'completed';

export interface Order {
  token: string;
  storeId: string;
  slot: string;
  items: CartItem[];
  totalTwd: number;
  customer: CheckoutDetails;
  status: OrderStatus;
  pickupNumber: string;
  createdAt: string;
}
