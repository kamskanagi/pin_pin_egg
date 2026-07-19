# Design Brief — Online Pickup Ordering (Taiwan MVP)

Status: awaiting confirmation · Produced by `/impeccable shape` · 2026-07-19

Confirmed inputs: **pickup order-ahead** model · **ECPay all-in-one** payments (cards, LINE Pay, JKoPay, Apple Pay, ATM/CVS codes, e-invoice) · **guest checkout with phone number**.

## 1. Feature summary

Online order-ahead for Pin Pin Café's Taiwan stores: a customer browses the menu, customizes items, pays through ECPay, and collects at a chosen store at a chosen time slot. No account required — name and mobile number identify the order. Japan stores are excluded from the MVP (TWD only).

## 2. Primary user action

Complete a pickup order on a phone in under two minutes: store → items → slot → pay.

## 3. Design direction

- **Register:** product (the ordering flow is a tool, not a brochure). The marketing site stays brand register; the flow inherits its tokens but tightens composition.
- **Color strategy:** Restrained — cream surfaces, charcoal text, warm-gold reserved for the primary action and progress. No new colors.
- **Scene sentence:** a commuter on the MRT platform, phone in one hand, ordering eggcakes to collect at Nangang LaLaport in 20 minutes, in bright daylight → light theme, mobile-first, large touch targets, zero horizontal reach.
- **Anchors:** the existing Pin Pin design system; Taiwanese drink-shop ordering conventions (甜度/冰塊 option grids familiar from 50嵐/CoCo apps); LINE-era checkout brevity.

## 4. Scope

Production-ready fidelity · full flow (5 screens) · shipped-quality interactivity · built incrementally behind a feature flag until store operations are ready.

## 5. Flow and layout strategy

Entry: the navbar CTA ("找門市") becomes "線上訂購" once the flow ships.

1. **Store picker** — list of Taiwan stores with open/closed state and hours; chosen store pins to a slim context header for the rest of the flow.
2. **Order menu** — single column, category-grouped (雞蛋仔 / 茶 / 咖啡 / 季節限定), reusing menu photography; sticky bottom bar shows running total and item count.
3. **Item options** — inline expanding option sheet: size, 甜度 (sweetness), 冰塊 (ice), toppings; quantity stepper; option groups modeled as data, not hardcoded.
4. **Cart + time slot** — editable line items; slot picker in 15-minute increments generated from store hours plus a 15-minute prep buffer; slots with exhausted capacity disabled.
5. **Checkout** — name, mobile number, e-invoice section (捐贈 / 手機載具 / 統一編號 — legally required choices in Taiwan), payment method; redirect to ECPay hosted page; return URL lands on an order-status page with pickup number and an "add us on LINE" prompt.

Desktop: same flow centered in a narrow (~640px) column; marketing-page width is wrong for a task flow.

## 6. Key states

- Store closed / ordering outside hours (show next available slot day)
- Item sold out or unavailable at the chosen store
- Empty cart; cart persisted in localStorage across sessions
- Slot capacity full
- Payment pending (awaiting ECPay callback), failed, timed out — each with a retry path that preserves the cart
- Order confirmed — pickup number, store address/map link, slot time
- Network failure at any step → inline retry, never a dead end

## 7. Interaction model

- One primary action per screen, always in warm-gold, always full-width on mobile.
- Option selection is tap-only (no dropdowns); selected state uses the existing badge/filter visual language.
- Progress is implicit via the context header (store · slot · total), not a stepper bar.
- Status page polls order state after the ECPay return; a paid order survives page refresh via the order token in the URL.

## 8. Content requirements

- New `order` namespace in all three message files (zh-TW first-class; en/ja kept in parity for tourists).
- Copy for every state in §6 plus option labels, e-invoice field labels and helper text, and SMS/LINE order-ready message templates.
- Reuse existing menu photography; new photography only for toppings if added later.

## 9. Technical shape

- **Data:** orders, stores, slots, and menu-option-groups need a real database — Supabase Postgres fits the Vercel deployment. Sanity remains the source for menu content; extend `menuItem` schema with option groups and per-store availability now, mirror in `placeholder-data.ts` until Sanity is live.
- **API:** `POST /api/orders` (create + ECPay checkout params), `POST /api/ecpay/callback` (payment + invoice result, idempotent), `GET /api/orders/[token]` (status).
- **ECPay:** sandbox merchant first; CheckMacValue signing server-side only; e-invoice issued through ECPay's invoice API on payment success.
- **Flag:** `NEXT_PUBLIC_ORDERING_ENABLED` gates the nav CTA and routes.

## 10. Asserted defaults (not open questions)

TWD only · Taiwan stores only · zh-TW-first copy · 15-minute prep buffer · no refund UI in MVP (customer service handles) · no delivery · LINE Login and loyalty deferred to phase C.
