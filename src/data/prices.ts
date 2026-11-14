/**
 * Service prices — the only place they are set.
 *
 * Change a number below. Buttons, page copy, mailto subjects and bodies,
 * meta and Open Graph descriptions, and JSON-LD all read this object.
 * Amounts are whole US dollars. `currency` is the only currency setting;
 * the symbol shown on the page is derived from it.
 *
 * Ranges render as $60–$120: a dollar sign on both sides and an en dash,
 * so the top of the range still reads as a price.
 *
 * scan — the written report, one amount
 * fix.small / fix.medium / fix.launch — repair tiers, each a min and max
 * hourly — per hour, when a tier does not fit
 *
 * automation.light / automation.medium — fixed-price custom programs.
 * The large project is quoted ("Price on request") and has no amount here.
 * SHOW_AUTOMATION_BLOCK — set false to hide that section on /en/ and /uslugi/.
 */

const CURRENCIES = { USD: '$' } as const;
type Currency = keyof typeof CURRENCIES;
const currency: Currency = 'USD';

export const PRICES = {
  currency,
  symbol: CURRENCIES[currency],
  scan: 49,
  fix: {
    small: { min: 60, max: 120 },
    medium: { min: 150, max: 300 },
    launch: { min: 350, max: 600 },
  },
  hourly: { min: 20, max: 25 },
  automation: {
    light: 60,
    medium: 200,
  },
};

/** Custom programs section. On for both /en/ and /uslugi/. */
export const SHOW_AUTOMATION_BLOCK = true;

/** Whole-dollar amount with `PRICES.symbol`. No thousands separator. */
export function formatPrice(amount: number): string {
  return `${PRICES.symbol}${amount}`;
}

/** "$60–$120". */
export function formatRange(min: number, max: number): string {
  return `${formatPrice(min)}–${formatPrice(max)}`;
}

/** "$20–$25/hour". */
export function formatHourly(min: number, max: number): string {
  return `${formatRange(min, max)}/hour`;
}
