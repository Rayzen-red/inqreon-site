// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import fs from 'node:fs';
import path from 'node:path';
import remarkMarkers from './src/plugins/remark-markers.mjs';
import remarkInternalLinks from './src/plugins/remark-internal-links.mjs';

// GitHub Pages + собственный домен inqreon.com:
//   site = https://inqreon.com, base = '/' (домен в корне, не /<repo>/).
//   Файл public/CNAME содержит inqreon.com.
const SITE = 'https://inqreon.com';

// Даты проверки статей для <lastmod> в sitemap + список непустых рубрик
const articlesDir = path.resolve('./src/content/articles');
const lastmod = new Map();
const filledRubrics = new Set();
if (fs.existsSync(articlesDir)) {
  for (const f of fs.readdirSync(articlesDir).filter((x) => x.endsWith('.md'))) {
    const src = fs.readFileSync(path.join(articlesDir, f), 'utf8');
    const fm = src.split('---')[1] ?? '';
    const get = (k) => fm.match(new RegExp(`^${k}:\\s*"?([^"\\n]+)"?`, 'm'))?.[1]?.trim();
    if (get('draft') === 'true') continue;
    const rubric = get('rubric');
    const slug = get('slug') ?? f.replace(/\.md$/, '');
    const date = get('updatedAt') ?? get('checkedAt');
    if (rubric) {
      filledRubrics.add(rubric);
      if (date) {
        const iso = new Date(date).toISOString();
        lastmod.set(`${SITE}/${rubric}/${slug}/`, iso);
        const hub = `${SITE}/${rubric}/`;
        if (!lastmod.has(hub) || iso > lastmod.get(hub)) lastmod.set(hub, iso);
        const home = `${SITE}/`;
        if (!lastmod.has(home) || iso > lastmod.get(home)) lastmod.set(home, iso);
      }
    }
  }
}
const RUBRICS = ['neyroseti', 'dlya-raboty', 'dlya-ucheby', 'prompty', 'sravneniya', 'dostup-i-oplata', 'kosmos-i-nauka', 'instrumenty'];
const emptyRubricUrls = new Set(RUBRICS.filter((r) => !filledRubrics.has(r) && r !== 'instrumenty').map((r) => `${SITE}/${r}/`));
const legacyDir = path.resolve('./src/pages/neyroseti');
const legacyUrls = new Set(
  fs.existsSync(legacyDir)
    ? fs.readdirSync(legacyDir).filter((f) => f.endsWith('.astro')).map((f) => `${SITE}/neyroseti/${f.replace(/\.astro$/, '')}/`)
    : [],
);

// Все существующие внутренние URL: статические страницы + хабы рубрик + статьи.
// Ссылки в Markdown на что-то другое (ещё не написанные статьи) скрываются плагином.
// Реестр рекламных ссылок ([PARTNER: …] → карточка «Реклама» с erid, когда данные заполнены)
const ADS = JSON.parse(fs.readFileSync(path.resolve('./src/data/ads.json'), 'utf-8'));

const pagesDir = path.resolve('./src/pages');
const staticLastmod = new Map();
const stamp = (urlPath, file) => {
  const full = path.resolve(file);
  if (fs.existsSync(full)) staticLastmod.set(`${SITE}${urlPath}`, fs.statSync(full).mtime.toISOString());
};
stamp('/o-proekte/', 'src/pages/o-proekte.astro');
stamp('/kontakty/', 'src/pages/kontakty.astro');
stamp('/redakcionnaya-politika/', 'src/pages/redakcionnaya-politika.astro');
stamp('/raskrytie-partnerskih-ssylok/', 'src/pages/raskrytie-partnerskih-ssylok.astro');
stamp('/instrumenty/', 'src/pages/[rubric]/index.astro');
const validPaths = new Set(['/']);
for (const f of fs.readdirSync(pagesDir)) {
  const m = f.match(/^([a-z0-9-]+)\.astro$/);
  if (m && m[1] !== 'index' && m[1] !== '404') validPaths.add(`/${m[1]}/`);
}
// Хабы рубрик считаем существующими, только если в рубрике есть статьи (пустые — noindex-заглушки).
RUBRICS.filter((r) => filledRubrics.has(r)).forEach((r) => validPaths.add(`/${r}/`));
for (const u of lastmod.keys()) validPaths.add(u.slice(SITE.length));

export default defineConfig({
  site: SITE,
  base: '/',
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory' },
  markdown: {
    // remark-конвейер нужен для плагина, подсвечивающего [PARTNER: …] и [ПРОВЕРИТЬ]
    processor: unified({ remarkPlugins: [[remarkInternalLinks, { valid: [...validPaths] }], [remarkMarkers, { ads: ADS }]] }),
  },
  integrations: [
    sitemap({
      // noindex-страницы (пустые рубрики, шаблон политики, 404, старые адреса) в карту сайта не попадают
      filter: (page) => !page.includes('/404') && !page.includes('/politika-konfidencialnosti/') && !legacyUrls.has(page) && !emptyRubricUrls.has(page),
      serialize(item) {
        const lm = lastmod.get(item.url) ?? staticLastmod.get(item.url);
        if (lm) item.lastmod = lm;
        return item;
      },
    }),
  ],
});
