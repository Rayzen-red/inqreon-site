import fs from 'node:fs';
import path from 'node:path';
import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '../data/site';

export type NewsEntry = CollectionEntry<'news'>;
export type Lang = 'ru' | 'en';
export type CtaKind = 'scan' | 'fix' | 'telegram';

function envValue(name: string): string | undefined {
  return process.env[name];
}

/** Preview-only. Production builds leave this unset, so drafts are omitted. */
export function showDrafts(): boolean {
  return envValue('SHOW_DRAFTS') === '1';
}

const requestedSize = Number(envValue('NEWS_PAGE_SIZE') || 12);
export const PAGE_SIZE = Math.min(48, Math.max(1, Number.isFinite(requestedSize) ? requestedSize : 12));

export function isPublic(entry: NewsEntry): boolean {
  return showDrafts() || !entry.data.draft;
}

export function resolveCta(entry: NewsEntry): CtaKind {
  return entry.data.cta ?? (entry.data.lang === 'en' ? 'scan' : 'telegram');
}

export function newsPath(lang: Lang, slug?: string): string {
  const base = lang === 'en' ? '/en/news/' : '/news/';
  return slug ? `${base}${slug}/` : base;
}

export function pagePath(lang: Lang, page: number): string {
  if (page <= 1) return newsPath(lang);
  return `${newsPath(lang)}page/${page}/`;
}

export function formatNewsDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Drop an image path when the file is not in public/. The page then renders without a cover. */
export function newsImage(image?: string): string | undefined {
  if (!image) return undefined;
  const full = path.join(process.cwd(), 'public', image.replace(/^\//, ''));
  return fs.existsSync(full) ? image : undefined;
}

const BANNED = /instagram|facebook\.com|meta\.com/i;

let checked = false;

export function assertNews(entries: NewsEntry[]) {
  if (checked) return;
  checked = true;
  const seen = new Set<string>();
  for (const entry of entries) {
    const parts = entry.id.split('/');
    const fileSlug = (parts[parts.length - 1] ?? '').replace(/\.md$/, '');
    if (parts.length >= 2 && parts[0] !== entry.data.lang) {
      throw new Error(`News ${entry.id}: folder "${parts[0]}" does not match lang "${entry.data.lang}"`);
    }
    if (fileSlug !== entry.data.slug) {
      throw new Error(`News ${entry.id}: file name must match slug "${entry.data.slug}"`);
    }
    const key = `${entry.data.lang}:${entry.data.slug}`;
    if (seen.has(key)) throw new Error(`Duplicate news slug ${key}`);
    seen.add(key);
    const blob = [
      entry.data.title,
      entry.data.description,
      entry.data.imageAlt ?? '',
      entry.body ?? '',
      ...entry.data.sources.flatMap((source) => [source.title, source.url]),
    ].join('\n');
    if (BANNED.test(blob)) throw new Error(`News ${entry.id} mentions Instagram, Facebook, or Meta`);
  }
}

export async function allNews(): Promise<NewsEntry[]> {
  const entries = await getCollection('news');
  assertNews(entries);
  return entries;
}

export async function loadNews(lang?: Lang): Promise<NewsEntry[]> {
  const entries = await allNews();
  return entries
    .filter((entry) => isPublic(entry) && (!lang || entry.data.lang === lang))
    .sort((a, b) => +b.data.date - +a.data.date || a.data.translationKey.localeCompare(b.data.translationKey));
}

export function relatedNews(entry: NewsEntry, pool: NewsEntry[], limit = 3): NewsEntry[] {
  const tags = new Set(entry.data.tags);
  return pool
    .filter((item) => item.data.lang === entry.data.lang && item.id !== entry.id)
    .map((item) => ({ item, score: item.data.tags.filter((tag) => tags.has(tag)).length }))
    .sort((a, b) => b.score - a.score || +b.item.data.date - +a.item.data.date || a.item.data.translationKey.localeCompare(b.item.data.translationKey))
    .slice(0, limit)
    .map((row) => row.item);
}

export function pageWindow(current: number, total: number): (number | 'gap')[] {
  const keep = new Set([1, total, current - 1, current, current + 1].filter((n) => n >= 1 && n <= total));
  const sorted = [...keep].sort((a, b) => a - b);
  const out: (number | 'gap')[] = [];
  for (const n of sorted) {
    const prev = out[out.length - 1];
    if (typeof prev === 'number' && n - prev > 1) out.push('gap');
    out.push(n);
  }
  return out;
}

export function feedCopy(lang: Lang, page: number) {
  const title = lang === 'ru' ? 'Новости' : 'News';
  const description =
    lang === 'ru'
      ? 'Короткие новости об ИИ и о том, что проверить перед запуском сайта или приложения.'
      : 'Short AI news, and what to check before a generated site or app meets real users.';
  return {
    title: page > 1 ? (lang === 'ru' ? `${title}, страница ${page}` : `${title}, page ${page}`) : title,
    description,
    rssPath: lang === 'ru' ? '/news/rss.xml' : '/en/news/rss.xml',
    lead:
      lang === 'ru'
        ? 'Модели, инструменты и то, что обычно ломается, когда проект из Lovable, Bolt, Cursor или v0 встречает живых пользователей.'
        : 'Models, tools, and what usually breaks when a project built in Lovable, Bolt, Cursor, or v0 meets real users.',
  };
}

export function buildNewsSchema(entry: NewsEntry, image?: string) {
  const pagePathname = newsPath(entry.data.lang, entry.data.slug);
  const url = new URL(pagePathname, SITE.url).href;
  const published = entry.data.date.toISOString();
  const crumbs =
    entry.data.lang === 'ru'
      ? [
          { name: 'Главная', href: '/' },
          { name: 'Новости', href: '/news/' },
          { name: entry.data.title },
        ]
      : [
          { name: 'Home', href: '/en/' },
          { name: 'News', href: '/en/news/' },
          { name: entry.data.title },
        ];
  const schema: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: entry.data.title,
      description: entry.data.description,
      datePublished: published,
      dateModified: published,
      inLanguage: entry.data.lang,
      isAccessibleForFree: true,
      mainEntityOfPage: url,
      articleSection: 'News',
      keywords: entry.data.tags.join(', '),
      author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
      publisher: {
        '@type': 'Organization',
        name: SITE.name,
        url: SITE.url,
        logo: { '@type': 'ImageObject', url: new URL('/favicon.svg', SITE.url).href },
      },
      citation: entry.data.sources.map((source) => ({
        '@type': 'CreativeWork',
        name: source.title,
        url: source.url,
      })),
      ...(image ? { image: [new URL(image, SITE.url).href] } : {}),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: new URL(crumb.href ?? pagePathname, SITE.url).href,
      })),
    },
  ];
  return { schema, published, url, crumbs };
}
