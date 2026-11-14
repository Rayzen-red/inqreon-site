/**
 * English service page constants.
 *
 * PUBLIC_UPWORK_URL is the only Upwork setting. When it is empty, the page
 * does not link to upwork.com. The order button opens email instead.
 * Only the PUBLIC_ prefix is exposed to the browser.
 * Prices live in ./prices.ts — do not write a dollar amount in this file.
 */
import { PRICES, formatPrice } from './prices';

const raw = (import.meta.env.PUBLIC_UPWORK_URL || '') as string;

export const UPWORK_URL = raw.trim();
export const HAS_UPWORK = UPWORK_URL.length > 0;

export const EMAIL = 'raydzim.group@gmail.com';
export const TELEGRAM_URL = 'https://t.me/Inqreon_bot';

export const PAGE = {
  title: 'Inqreon — I fix AI-built websites and apps',
  description:
    `Your Lovable, Bolt, Cursor or v0 project works in preview but breaks for real users. I get it production-ready: login, security, payments and deploy. Written messages only, fixed price. A Scan is ${formatPrice(PRICES.scan)}.`,
};

function mailto(subject: string, body: string): string {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const SCAN_MAIL = mailto(
  'Scan request — AI-built app',
  `Hi,

I'd like a ${formatPrice(PRICES.scan)} Scan.

Project link:
Built with (Lovable, Bolt, Cursor, or v0):
What's broken:

I won't send passwords or secret keys in this email.
`,
);

export const FIX_MAIL = mailto(
  'Fix request — AI-built app',
  `Hi,

I'd like the app fixed.

Project link:
Built with (Lovable, Bolt, Cursor, or v0):
What's broken:

I won't send passwords or secret keys in this email.
`,
);

export const SUPPORT_MAIL = mailto(
  `Support request — ${formatPrice(PRICES.support)}/month`,
  `Hi,

I'd like Support at ${formatPrice(PRICES.support)}/month after the app is live.

Project link:
`,
);

export type OrderKind = 'scan' | 'fix' | 'support' | 'hire';

/** One switch: Upwork profile when set, otherwise a prefilled email. */
export function orderHref(kind: OrderKind = 'scan'): string {
  if (HAS_UPWORK) return UPWORK_URL;
  if (kind === 'hire' || kind === 'scan') return SCAN_MAIL;
  if (kind === 'fix') return FIX_MAIL;
  if (kind === 'support') return SUPPORT_MAIL;
  return SCAN_MAIL;
}

/**
 * Fix tiers. Amounts come from PRICES. The sentences are plain scope,
 * still waiting on a final owner sign-off.
 */
export const FIX_TIERS = [
  {
    id: `t${PRICES.fix.low}`,
    price: formatPrice(PRICES.fix.low),
    description: 'One problem. Login, or deploy, or a single payment bug.',
  },
  {
    id: `t${PRICES.fix.mid}`,
    price: formatPrice(PRICES.fix.mid),
    description: 'A few connected problems. For example login and database access.',
  },
  {
    id: `t${PRICES.fix.high}`,
    price: formatPrice(PRICES.fix.high),
    description: 'The whole launch: login, security, payments, and deploy.',
  },
] as const;

/** Labels drawn on the rescue layers and repeated in the no-WebGL fallback. */
export const LAYERS = [
  { id: 'ui', name: 'UI', bad: 'Button does nothing', ok: 'Works on mobile' },
  { id: 'auth', name: 'Auth', bad: 'Login redirect loop', ok: 'Sessions work' },
  { id: 'db', name: 'Database', bad: 'RLS off: data is public', ok: 'RLS policies on' },
  { id: 'pay', name: 'Payments', bad: 'Webhook not verified', ok: 'Webhooks verified' },
  { id: 'deploy', name: 'Deploy', bad: 'Env vars missing', ok: 'Live on your domain' },
] as const;

export const STEP_CAPTIONS = [
  'Looks fine in preview. Breaks for real users.',
  'Scan: every layer checked, every problem written down.',
  'Fix: each layer repaired by the approved plan.',
  'Launch: back together and live.',
] as const;
