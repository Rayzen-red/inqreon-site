// Pairs of pages that are language counterparts.
//
// @astrojs/sitemap i18n treats `path` as the translation key: the URL with the
// locale prefix removed. Russian (the default locale) has no prefix.
//   path: '/'       ->  https://inqreon.com/      and  https://inqreon.com/en/
//   path: '/news/'  ->  https://inqreon.com/news/ and  https://inqreon.com/en/news/
//
// Add a row only when both pages exist. The sitemap emits xhtml:link alternates
// for a key only when every counterpart is actually in the built page list
// (drafts, 404, and empty rubric hubs never are). hreflang in the HTML comes
// from this same list.

export const DEFAULT_LOCALE = 'ru';

/** Locale key -> hreflang value. `defaultLocale` must be one of the keys. */
export const LOCALES = {
  ru: 'ru',
  en: 'en',
};

/**
 * @type {{ translationKey: string, path: string, xDefault: keyof typeof LOCALES }[]}
 * `translationKey` is the stable name. `path` is what the sitemap i18n option matches.
 */
export const TRANSLATIONS = [
  { translationKey: 'home', path: '/', xDefault: 'en' },
  // { translationKey: 'news', path: '/news/', xDefault: 'en' },
];

/**
 * Locale-stripped path, with a trailing slash.
 * `/en/news/` and `/news/` both become `/news/`. `/` and `/en/` both become `/`.
 * @param {string} pathname
 */
export function localeStrippedPath(pathname) {
  let path = pathname || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  if (!path.endsWith('/')) path = `${path}/`;
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return '/';
  const [first, ...rest] = segments;
  if (first !== DEFAULT_LOCALE && Object.prototype.hasOwnProperty.call(LOCALES, first)) {
    return rest.length === 0 ? '/' : `/${rest.join('/')}/`;
  }
  return `/${segments.join('/')}/`;
}

/** @param {string} pathname */
export function translationForPath(pathname) {
  const key = localeStrippedPath(pathname);
  return TRANSLATIONS.find((item) => item.path === key);
}

/**
 * Absolute hreflang alternates for a page, including x-default.
 * Empty when this path is not a registered pair.
 * @param {string} pathname
 * @param {string} siteUrl
 * @returns {{ lang: string, href: string }[]}
 */
export function hreflangLinks(pathname, siteUrl) {
  const pair = translationForPath(pathname);
  if (!pair) return [];
  const links = Object.entries(LOCALES).map(([locale, lang]) => ({
    lang,
    href: new URL(localizedPath(pair.path, locale), siteUrl).href,
  }));
  const fallback = links.find((link) => link.lang === pair.xDefault) ?? links[0];
  if (fallback) links.push({ lang: 'x-default', href: fallback.href });
  return links;
}

/**
 * @param {string} strippedPath
 * @param {string} locale
 */
export function localizedPath(strippedPath, locale) {
  const stripped = strippedPath === '/' ? '/' : strippedPath.endsWith('/') ? strippedPath : `${strippedPath}/`;
  if (locale === DEFAULT_LOCALE) return stripped;
  if (stripped === '/') return `/${locale}/`;
  return `/${locale}${stripped}`;
}
