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
//
// News articles are appended from news-translations.mjs. When the Russian and
// English slugs differ, `locales.en` is the English locale-stripped path.
// `applyHreflang` fills those sitemap links, because prefix matching cannot.

import { newsTranslationRows } from './news-translations.mjs';
import { guideTranslationRows } from './guide-translations.mjs';

export const DEFAULT_LOCALE = 'ru';

/** Locale key -> hreflang value. `defaultLocale` must be one of the keys. */
export const LOCALES = {
  ru: 'ru',
  en: 'en',
};

/**
 * @type {{ translationKey: string, path: string, xDefault: keyof typeof LOCALES, locales?: Partial<Record<keyof typeof LOCALES, string>> }[]}
 * `translationKey` is the stable name. `path` is what the sitemap i18n option matches
 * (the default-locale URL, prefix removed). `locales` overrides a language whose slug differs.
 */
export const TRANSLATIONS = [
  { translationKey: 'home', path: '/', xDefault: 'en' },
  { translationKey: 'news', path: '/news/', xDefault: 'en' },
  { translationKey: 'tools', path: '/instrumenty/', xDefault: 'en', locales: { en: '/tools/' } },
  { translationKey: 'guides', path: '/neyroseti/', xDefault: 'en', locales: { en: '/guides/' } },
  { translationKey: 'compare', path: '/sravneniya/', xDefault: 'en', locales: { en: '/compare/' } },
  { translationKey: 'service', path: '/uslugi/', xDefault: 'en', locales: { en: '/services/' } },
  { translationKey: 'about', path: '/o-proekte/', xDefault: 'en', locales: { en: '/about/' } },
  { translationKey: 'contact', path: '/kontakty/', xDefault: 'en', locales: { en: '/contact/' } },
  { translationKey: 'editorial', path: '/redakcionnaya-politika/', xDefault: 'en', locales: { en: '/editorial/' } },
  { translationKey: 'affiliates', path: '/raskrytie-partnerskih-ssylok/', xDefault: 'en', locales: { en: '/affiliates/' } },
  // English slug is /privacy/, not /politika-konfidencialnosti/.
  { translationKey: 'privacy', path: '/politika-konfidencialnosti/', xDefault: 'en', locales: { en: '/privacy/' } },
  ...newsTranslationRows(),
  ...guideTranslationRows(),
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
  return TRANSLATIONS.find((item) => {
    if (item.path === key) return true;
    return !!item.locales && Object.values(item.locales).includes(key);
  });
}

/**
 * @param {{ path: string, locales?: Partial<Record<string, string>> }} pair
 * @param {string} locale
 */
export function pairPath(pair, locale) {
  const custom = pair.locales?.[locale];
  if (custom) return localizedPath(custom, locale);
  return localizedPath(pair.path, locale);
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
    href: new URL(pairPath(pair, locale), siteUrl).href,
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

/**
 * Path of the other language, or null when this URL is not a registered pair.
 * @param {string} pathname
 */
export function alternatePath(pathname) {
  const pair = translationForPath(pathname);
  if (!pair) return null;
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const current = path === '/en' || path.startsWith('/en/') ? 'en' : 'ru';
  const next = pairPath(pair, current === 'en' ? 'ru' : 'en');
  return next === path ? null : next;
}

/**
 * Header / article switch. Unpaired news falls back to the other feed,
 * and that fallback is not a hreflang counterpart.
 * @param {string} pathname
 */
export function languageSwitch(pathname) {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const lang = path === '/en' || path.startsWith('/en/') ? 'en' : 'ru';
  const alt = alternatePath(path);
  const paired = Boolean(alt);
  const stripped = localeStrippedPath(path);
  let label;
  if (!paired) label = lang === 'ru' ? 'Все новости по-английски' : 'All Russian news';
  else if (stripped === '/news/') label = lang === 'ru' ? 'Новости по-английски' : 'News in Russian';
  else label = lang === 'ru' ? 'Та же новость по-английски' : 'The same story in Russian';
  return {
    lang,
    href: alt ?? (lang === 'ru' ? '/en/news/' : '/news/'),
    paired,
    label,
  };
}

/**
 * Sitemap serialize step. Alternates come from this registry, including news
 * articles whose slugs differ. x-default is the English URL. Pages that are
 * not a registered pair get no alternates, even if the sitemap i18n option
 * grouped them by a shared path (for example /news/page/2/).
 * Register a row only when both URLs are real pages in the build.
 * @param {{ url: string, links?: { lang: string, url: string }[] }} item
 * @param {string} siteUrl
 */
export function applyHreflang(item, siteUrl) {
  const pair = translationForPath(new URL(item.url).pathname);
  if (!pair) {
    delete item.links;
    return item;
  }
  const links = Object.entries(LOCALES).map(([locale, lang]) => ({
    lang,
    url: new URL(pairPath(pair, locale), siteUrl).href,
  }));
  const fallback = links.find((link) => link.lang === pair.xDefault) ?? links[0];
  item.links = fallback ? [...links, { lang: 'x-default', url: fallback.url }] : links;
  return item;
}
