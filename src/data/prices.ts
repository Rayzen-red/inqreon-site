/**
 * Service prices — the only place they are set.
 *
 * Change a number below. Buttons, page copy, mailto subjects and bodies,
 * meta and Open Graph descriptions, and JSON-LD all read this object.
 * Amounts are whole US dollars. `symbol` is what the page shows; `currency`
 * is the JSON-LD priceCurrency. Set them together.
 *
 * scan — the written report
 * fix.low / fix.mid / fix.high — the three repair tiers, low to high
 * support — monthly, after launch
 */
export const PRICES = {
  currency: 'USD',
  symbol: '$',
  scan: 79,
  fix: {
    low: 249,
    mid: 399,
    high: 599,
  },
  support: 19,
} as const;

/** Whole-dollar amount with `PRICES.symbol`. No thousands separator. */
export function formatPrice(amount: number): string {
  return `${PRICES.symbol}${amount}`;
}
