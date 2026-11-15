/**
 * Outbound partner URLs. One file on purpose.
 *
 * `href` is the affiliate or partner link. Leave it empty until a real URL
 * exists. Do not invent one. An empty href is not a partnership: the page
 * links to `site` (the service's own address) and does not mark it sponsored.
 * A filled href is rendered with rel="sponsored nofollow".
 *
 * SYNTX is the one link already published on the catalog, with the same URL
 * the site used before this file existed. Its erid is still empty.
 */

export interface Partner {
  id: string;
  name: string;
  /** The service's own site. Not an affiliate link. */
  site: string;
  /** Affiliate or partner URL. Empty until one is real. */
  href: string;
  /** Shown with the labeled ad, when this partner has a creative. */
  note?: string;
}

export const PARTNERS: Partner[] = [
  { id: 'chad', name: 'Chad', site: 'https://chadgpt.ru/', href: '' },
  { id: 'bothub', name: 'BotHub', site: 'https://bothub.chat/', href: '' },
  { id: 'gptunnel', name: 'GPTunneL', site: 'https://www.gptunnel.ru/', href: '' },
  { id: 'vsegpt', name: 'VseGPT', site: 'https://vsegpt.ru/', href: '' },
  { id: 'aitunnel', name: 'AITUNNEL', site: 'https://aitunnel.ru/', href: '' },
  { id: 'proxyapi', name: 'ProxyAPI', site: 'https://proxyapi.ru/', href: '' },
  { id: 'polza', name: 'Polza.ai', site: 'https://polza.ai/', href: '' },
  { id: 'genapi', name: 'GenAPI', site: 'https://gen-api.ru/', href: '' },
  { id: 'openrouter', name: 'OpenRouter', site: 'https://openrouter.ai/', href: '' },
  {
    id: 'syntx',
    name: 'SYNTX',
    site: 'https://t.me/syntxaibot',
    href: 'https://t.me/syntxaibot?start=aff_5329155594',
    note: 'SYNTX INTELLIGENCE – FZCO',
  },
];

export function partnerById(id: string): Partner | undefined {
  return PARTNERS.find((item) => item.id === id);
}

/** Sponsored only when href is a non-empty URL. Otherwise the public site. */
export function partnerOutbound(id: string): { href: string; sponsored: boolean; name: string } | null {
  const item = partnerById(id);
  if (!item) return null;
  const href = item.href.trim();
  if (href) return { href, sponsored: true, name: item.name };
  return { href: item.site, sponsored: false, name: item.name };
}
