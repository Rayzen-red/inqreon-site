// News pairs for src/data/translations.mjs.
//
// Reads src/content/news/{ru,en}/*.md directly so astro.config and the
// hreflang registry can run before the content collection is built.
// A pair is registered only when both languages are publishable.
// SHOW_DRAFTS=1 (off by default) treats drafts as publishable for previews.

import fs from 'node:fs';
import path from 'node:path';

// cwd, not import.meta.url: Vite's page bundle rewrites the module URL.
const ROOT = path.resolve(process.cwd(), 'src/content/news');

function envValue(name) {
  return process.env[name];
}

function showDrafts() {
  // Variable key so Vite does not inline this as undefined in page SSR.
  return envValue('SHOW_DRAFTS') === '1';
}

function field(fm, key) {
  const match = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!match) return '';
  return match[1].trim().replace(/^["']|["']$/g, '');
}

function readFile(file, lang) {
  const src = fs.readFileSync(file, 'utf8');
  if (!src.startsWith('---')) throw new Error(`${file} is missing frontmatter`);
  const end = src.indexOf('\n---', 3);
  if (end === -1) throw new Error(`${file} frontmatter does not close`);
  const fm = src.slice(3, end);
  const slug = field(fm, 'slug');
  const declared = field(fm, 'lang');
  const draftRaw = field(fm, 'draft');
  const translationKey = field(fm, 'translationKey');
  const date = field(fm, 'date');
  const base = path.basename(file, '.md');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`${file} has an invalid slug`);
  if (slug === 'page' || slug === 'rss') throw new Error(`${file} uses a reserved slug`);
  if (base !== slug) throw new Error(`${file} file name must match slug "${slug}"`);
  if (declared !== lang) throw new Error(`${file} lang is "${declared}" but the folder is ${lang}`);
  if (draftRaw !== 'true' && draftRaw !== 'false') throw new Error(`${file} draft must be true or false`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(translationKey)) {
    throw new Error(`${file} has an invalid translationKey`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`${file} date must be YYYY-MM-DD`);
  return {
    lang,
    slug,
    date,
    translationKey,
    draft: draftRaw === 'true',
    path: lang === 'en' ? `/en/news/${slug}/` : `/news/${slug}/`,
  };
}

function readAll() {
  /** @type {ReturnType<typeof readFile>[]} */
  const files = [];
  for (const lang of ['ru', 'en']) {
    const dir = path.join(ROOT, lang);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir).filter((item) => item.endsWith('.md')).sort()) {
      files.push(readFile(path.join(dir, name), lang));
    }
  }
  const slugs = new Set();
  for (const file of files) {
    const key = `${file.lang}:${file.slug}`;
    if (slugs.has(key)) throw new Error(`Duplicate news slug ${key}`);
    slugs.add(key);
  }
  return files;
}

function live(file) {
  return showDrafts() || !file.draft;
}

/** Pages that this build will emit. Drafts are included only when SHOW_DRAFTS=1. */
export function indexableNews() {
  return readAll().filter(live);
}

/**
 * Rows for TRANSLATIONS. Same-slug pairs use `path` alone, which is what
 * @astrojs/sitemap i18n matches. Different slugs set `locales.en` to the
 * English locale-stripped path so hreflang still joins the translationKey.
 * @returns {{ translationKey: string, path: string, xDefault: 'en', locales?: { en: string } }[]}
 */
export function newsTranslationRows() {
  /** @type {Map<string, { ru?: ReturnType<typeof readFile>, en?: ReturnType<typeof readFile> }>} */
  const groups = new Map();
  for (const file of readAll().filter(live)) {
    const group = groups.get(file.translationKey) ?? {};
    if (group[file.lang]) {
      throw new Error(`Two ${file.lang} news files share translationKey ${file.translationKey}`);
    }
    group[file.lang] = file;
    groups.set(file.translationKey, group);
  }

  /** @type {{ translationKey: string, path: string, xDefault: 'en', locales?: { en: string } }[]} */
  const rows = [];
  const claimed = new Set(['/', '/news/']);
  for (const translationKey of [...groups.keys()].sort()) {
    const group = groups.get(translationKey);
    if (!group?.ru || !group?.en) continue;
    /** @type {{ translationKey: string, path: string, xDefault: 'en', locales?: { en: string } }} */
    const row = {
      translationKey,
      path: `/news/${group.ru.slug}/`,
      xDefault: 'en',
    };
    if (group.ru.slug !== group.en.slug) {
      row.locales = { en: `/news/${group.en.slug}/` };
    }
    for (const itemPath of [row.path, ...(row.locales ? Object.values(row.locales) : [])]) {
      if (claimed.has(itemPath)) throw new Error(`News translation path ${itemPath} belongs to two pairs`);
      claimed.add(itemPath);
    }
    rows.push(row);
  }
  return rows;
}
