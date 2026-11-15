// Guide pairs for src/data/translations.mjs.
// Drafts stay out unless SHOW_DRAFTS=1. A pair is registered only when both
// languages are publishable, same rule as news.

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), 'src/content/guides');

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
  const base = path.basename(file, '.md');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`${file} has an invalid slug`);
  if (base !== slug) throw new Error(`${file} file name must match slug "${slug}"`);
  if (declared !== lang) throw new Error(`${file} lang is "${declared}" but the folder is ${lang}`);
  if (draftRaw !== 'true' && draftRaw !== 'false') throw new Error(`${file} draft must be true or false`);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(translationKey)) throw new Error(`${file} has an invalid translationKey`);
  return {
    lang,
    slug,
    translationKey,
    draft: draftRaw === 'true',
    path: lang === 'en' ? `/en/tools/${slug}/` : `/instrumenty/note/${slug}/`,
  };
}

function readAll() {
  const files = [];
  if (!fs.existsSync(ROOT)) return files;
  for (const lang of ['ru', 'en']) {
    const dir = path.join(ROOT, lang);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir).filter((item) => item.endsWith('.md')).sort()) {
      files.push(readFile(path.join(dir, name), lang));
    }
  }
  return files;
}

function live(file) {
  return process.env.SHOW_DRAFTS === '1' || !file.draft;
}

export function indexableGuides() {
  return readAll().filter(live);
}

export function guideTranslationRows() {
  const groups = new Map();
  for (const file of indexableGuides()) {
    const group = groups.get(file.translationKey) ?? {};
    group[file.lang] = file;
    groups.set(file.translationKey, group);
  }
  const rows = [];
  for (const translationKey of [...groups.keys()].sort()) {
    const group = groups.get(translationKey);
    if (!group?.ru || !group?.en) continue;
    rows.push({
      translationKey: `guide-${translationKey}`,
      path: `/instrumenty/note/${group.ru.slug}/`,
      xDefault: 'en',
      // English lives under /en/tools/, not under /en/instrumenty/note/.
      locales: { en: `/tools/${group.en.slug}/` },
    });
  }
  return rows;
}
