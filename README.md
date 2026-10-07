# Inqreon — сайт на Astro

```bash
export PATH=$HOME/.local/node22/bin:$PATH   # Node >= 22.12
npm install
python3 scripts/sync_articles.py            # ../article-XX.md -> src/content/articles/
npm run build                               # результат в dist/
python3 scripts/check_links.py              # 404-проверка внутренних ссылок в dist/
npm run release-check                       # всё сразу: sync + build + check_links
npm run preview                             # локальный просмотр собранного сайта
```

- `astro.config.mjs` — site https://inqreon.com, base '/', trailingSlash always, sitemap, remark-плагин пометок.
- `src/content.config.ts` — схема коллекции `articles`.
- `src/data/rubrics.ts` — рубрики и их URL (по structure.md); `src/data/site.ts` — название, владелец, e-mail, Telegram, OG-картинка.
- `src/pages/[rubric]/[slug].astro` — шаблон статьи; `src/pages/[rubric]/index.astro` — хаб рубрики.
- `src/plugins/remark-markers.mjs` — подсветка `[PARTNER: …]` и `[ПРОВЕРИТЬ]`.
- `src/plugins/remark-internal-links.mjs` — скрывает внутренние ссылки на страницы, которых нет в сборке (список URL формируется в `astro.config.mjs`).
- `src/lib/ad.mjs`, `src/components/AdCard.astro`, `src/data/ads.json` — рекламная карточка «Реклама» + рекламодатель + erid (`rel="sponsored nofollow"`); `[PARTNER: Имя]` в статье превращается в карточку, когда запись `Имя` в `ads.json` заполнена (href, erid, advertiser, title).
- `scripts/check_links.py` — проверка, что внутренние ссылки в `dist/` не ведут на 404.
- `public/` — CNAME, robots.txt, .nojekyll, favicon.svg, og-default.png.
- Файлы в `src/content/articles/` генерируются скриптом — правьте исходники `../article-XX.md`.
