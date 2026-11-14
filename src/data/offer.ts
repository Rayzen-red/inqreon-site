/**
 * English service page constants.
 *
 * UPWORK_URL is the public profile link. It is a placeholder until the owner
 * sets the UPWORK_URL environment variable at build time. Not a secret.
 */
const raw = (import.meta.env.UPWORK_URL || import.meta.env.PUBLIC_UPWORK_URL || '') as string;

export const UPWORK_URL = raw.trim() || 'https://www.upwork.com/';

export const EMAIL = 'raydzim.group@gmail.com';

export const PAGE = {
  title: 'Inqreon — I fix AI-built websites and apps',
  description:
    'Your Lovable, Bolt, Cursor or v0 project works in preview but breaks for real users. I get it production-ready: login, security, payments and deploy. Fixed price, written messages only.',
};

/**
 * TO CONFIRM with the owner.
 * Fix tier descriptions are a draft from the concept. They are not a final
 * scope promise. Prices themselves ($249 / $399 / $599) are the agreed offer.
 */
export const FIX_TIERS = [
  {
    id: 't249',
    price: '$249',
    description: 'One broken area, for example login or deploy.',
  },
  {
    id: 't399',
    price: '$399',
    description: 'Several connected problems, for example login plus database security.',
  },
  {
    id: 't599',
    price: '$599',
    description: 'The full path to launch: login, security, payments and deploy.',
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
