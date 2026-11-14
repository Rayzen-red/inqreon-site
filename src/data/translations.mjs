// Pairs of pages that are language counterparts.
//
// @astrojs/sitemap i18n treats `path` as the translation key: the URL with the
// locale prefix removed. Russian (the default locale) has no prefix.
//   path: '/'       ->  https://inqreon.com/      and  https://inqreon.com/en/
//   path: '/news/'  ->  https://inqreon.com/news/ and  https://inqreon.com/en/news/
//
// Add a row only when both pages exist. Alternates are emitted only when every
// locale in the pair has a route this build will actually generate (static page
// file, non-draft article, or rubric hub). A stale row does not advertise a 404.

import fs from 'node:fs';
import path from 'node:path';

// astro build bundles this module, so import.meta.url is not src/data/.
// The Astro CLI and the IndexNow script both run with the repo as cwd.
const ROOT = process.cwd();

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
 * Paths this build will generate. Dynamic route folders (`[rubric]`) are not
 * concrete URLs; their pages come from articles and the rubric list.
 * @returns {Set<string>}
 */
function routesInBuild() {
  const routes = new Set();
  walkPages(path.join(ROOT, 'src/pages'), '', routes);
  addContentRoutes(routes);
  return routes;
}

/**
 * @param {string} dir
 * @param {string} prefix
 * @param {Set<string>} routes
 */
function walkPages(dir, prefix, routes) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('[')) continue;
    if (entry.isDirectory()) {
      walkPages(path.join(dir, entry.name), `${prefix}/${entry.name}`, routes);
      continue;
    }
    if (!/\.(astro|md|mdx)$/.test(entry.name)) continue;
    const base = entry.name.replace(/\.(astro|md|mdx)$/, '');
    if (base === '404') continue;
    routes.add(base === 'index' ? (prefix ? `${prefix}/` : '/') : `${prefix}/${base}/`);
  }
}

/** @param {Set<string>} routes */
function addContentRoutes(routes) {
  const articlesDir = path.join(ROOT, 'src/content/articles');
  if (fs.existsSync(articlesDir)) {
    for (const file of fs.readdirSync(articlesDir)) {
      if (!file.endsWith('.md')) continue;
      const source = fs.readFileSync(path.join(articlesDir, file), 'utf8');
      const frontmatter = source.split('---')[1] ?? '';
      if (/^draft:\s*true\s*$/m.test(frontmatter)) continue;
      const rubric = frontmatter.match(/^rubric:\s*"?([^"\n]+)"?/m)?.[1]?.trim();
      const slug = frontmatter.match(/^slug:\s*"?([^"\n]+)"?/m)?.[1]?.trim() ?? file.replace(/\.md$/, '');
      if (!rubric) continue;
      routes.add(`/${rubric}/${slug}/`);
      routes.add(`/${rubric}/`);
    }
  }
  const rubricsFile = path.join(ROOT, 'src/data/rubrics.ts');
  if (!fs.existsSync(rubricsFile)) return;
  const source = fs.readFileSync(rubricsFile, 'utf8');
  for (const match of source.matchAll(/slug:\s*'([^']+)'/g)) routes.add(`/${match[1]}/`);
}

/**
 * Absolute hreflang alternates for a page, including x-default.
 * Empty when this path is not a registered pair, or when a counterpart
 * route will not be built.
 * @param {string} pathname
 * @param {string} siteUrl
 * @returns {{ lang: string, href: string }[]}
 */
export function hreflangLinks(pathname, siteUrl) {
  const pair = translationForPath(pathname);
  if (!pair) return [];
  const built = routesInBuild();
  const links = [];
  for (const [locale, lang] of Object.entries(LOCALES)) {
    const locPath = localizedPath(pair.path, locale);
    if (!built.has(locPath)) continue;
    links.push({ lang, href: new URL(locPath, siteUrl).href });
  }
  if (links.length < 2) return [];
  const fallback = links.find((link) => link.lang === pair.xDefault);
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
