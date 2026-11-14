# Indexing

What the site does on every push to `main`, and the one step that stays manual.

## On each deploy

The GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the Astro site and publishes `dist/` to GitHub Pages. Indexing files are produced by that build. Nothing is edited by hand after deploy.

1. **Sitemap.** `@astrojs/sitemap` writes `sitemap-index.xml` and `sitemap-0.xml` into `dist/` using `site: https://inqreon.com`. Drafts never become pages, so they are absent. The filter also drops `/404`, the legacy `/neyroseti/neyroseti-bez-vpn/` URL, and empty rubric hubs (they are `noindex`). The privacy policy stays in the map. A build hook copies the index to `sitemap.xml`, because many tools request that path and `https://inqreon.com/sitemap.xml` would otherwise 404. `robots.txt` points crawlers at `https://inqreon.com/sitemap-index.xml`. Either URL works: `sitemap.xml` is the same index.
2. **hreflang.** Pairs live in `src/data/translations.mjs`. `home` is `/` (`ru`) and `/en/` (`en`). `news` is `/news/` and `/en/news/`. `privacy` is `/politika-konfidencialnosti/` and `/en/privacy/`. `x-default` is the English URL. Article pairs are not listed by hand: `src/data/news-translations.mjs` appends a row when both languages of a `translationKey` are publishable. If the slugs differ, `locales.en` holds the English path, and `applyHreflang` writes those sitemap links because prefix matching cannot. The same registry renders `<link rel="alternate" hreflang>` on the paired pages. A story that exists in only one language, a draft, and pagination such as `/news/page/2/` get no alternates.
3. **IndexNow.** After Pages deploy succeeds (a push to `main`, or a manual run that published some other ref to the live site), the `indexnow` job downloads the sitemap artifact and POSTs the page URLs to `https://api.indexnow.org/indexnow` (`host`, `key`, `keyLocation`, `urlList`). More than 10,000 URLs are split into batches of 10,000. Each request times out after 20 seconds. A network error, or HTTP 403, 408, 429, or 5xx, is retried up to three times; every status is logged. `403` is retried because the key file can take a moment to show up on Pages. The job itself stops after 5 minutes so a stalled call cannot hold the next deploy. `continue-on-error` is set, so a failed ping does not fail the deploy. `200` and `202` are success. The key file is `public/6fbb656750b0fc23a2732f7483883b2c.txt`, served at `https://inqreon.com/6fbb656750b0fc23a2732f7483883b2c.txt`. Run `INDEXNOW_DRY_RUN=1 npm run indexnow` locally to print the URL list without sending it.

`robots.txt` allows crawling (`Allow: /`), including CSS, JS, images, and the IndexNow key file. It disallows `/go/` and `/tegi/` only. Those are not asset paths.

## Adding a translation

For a static pair, add a row to `TRANSLATIONS` in `src/data/translations.mjs`:

```js
{ translationKey: 'about', path: '/about/', xDefault: 'en' },
```

`path` is the locale-stripped Russian URL. `/about/` pairs with `/en/about/`. Russian is the default locale and has no prefix. Add the row only when both pages exist.

News articles use the same registry without a second list. Give the Russian and English markdown files the same `translationKey`. `news-translations.mjs` registers the pair, including when the slugs differ. A one-language story is left out.

## What you do once in Google Search Console

Google does not support IndexNow, and it turned off the old sitemap ping endpoint. Google will not hear about new URLs from this workflow. Submit the sitemap once:

1. Open [Google Search Console](https://search.google.com/search-console) with the account that should own the site.
2. Add a property. A URL-prefix property for `https://inqreon.com` is enough. A domain property is fine if you can add the DNS TXT record.
3. Verify. The site already loads Google tag `G-1WP83BSRDX`. If this Google account owns that Analytics property, Search Console can verify through it. Otherwise use the DNS TXT record.
4. Open **Sitemaps** and submit `https://inqreon.com/sitemap-index.xml`.

Leave that submission in place. Google re-reads the sitemap on its own schedule. You do not resubmit it after each deploy, and you do not ping Google.

Bing and Yandex receive the IndexNow request. You can also add the same sitemap in Bing Webmaster Tools and Yandex Webmaster if you want their dashboards; that is optional.
