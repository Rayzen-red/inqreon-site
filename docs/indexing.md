# Indexing

What the site does on every push to `main`, and the one step that stays manual.

## On each deploy

The GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the Astro site and publishes `dist/` to GitHub Pages. Indexing files are produced by that build. Nothing is edited by hand after deploy.

1. **Sitemap.** `@astrojs/sitemap` writes `sitemap-index.xml` and `sitemap-0.xml` into `dist/` using `site: https://inqreon.com`. Drafts never become pages, so they are absent. The filter also drops `/404`, the legacy `/neyroseti/neyroseti-bez-vpn/` URL, and empty rubric hubs (they are `noindex`). The privacy policy stays in the map. A build hook copies the index to `sitemap.xml`, because many tools request that path and `https://inqreon.com/sitemap.xml` would otherwise 404. `robots.txt` points crawlers at `https://inqreon.com/sitemap-index.xml`. Either URL works: `sitemap.xml` is the same index.
2. **hreflang.** Only registered translation pairs get alternates, and only when both URLs are in the built page list. The list is `src/data/translations.mjs`. The current pair is `home`: `/` (`ru`) and `/en/` (`en`), with `x-default` on the English URL. The sitemap `i18n` option matches a pair by the locale-stripped path (`/` for this one). The same list renders `<link rel="alternate" hreflang>` on those pages. Other URLs stay without alternates.
3. **IndexNow.** After Pages deploy succeeds, the `indexnow` job downloads the sitemap artifact and POSTs every page URL to `https://api.indexnow.org/indexnow` in one JSON body (`host`, `key`, `keyLocation`, `urlList`). The key file is `public/6fbb656750b0fc23a2732f7483883b2c.txt`, served at `https://inqreon.com/6fbb656750b0fc23a2732f7483883b2c.txt`. The step logs the HTTP status. `continue-on-error` is set, so a failed ping does not fail the deploy. `200` and `202` are success. Run `INDEXNOW_DRY_RUN=1 npm run indexnow` locally to print the URL list without sending it.

`robots.txt` allows crawling (`Allow: /`), including CSS, JS, images, and the IndexNow key file. It disallows `/go/` and `/tegi/` only. Those are not asset paths.

## Adding a translation

When a page exists in both languages, add a row to `TRANSLATIONS` in `src/data/translations.mjs`:

```js
{ translationKey: 'news', path: '/news/', xDefault: 'en' },
```

`path` is the translation key the sitemap uses: `/news/` pairs `https://inqreon.com/news/` with `https://inqreon.com/en/news/`. Russian is the default locale and has no prefix. Do not add the row until both pages are real routes. Unregistered paths, and registered paths that are missing a counterpart in the build, get no sitemap alternates.

## What you do once in Google Search Console

Google does not support IndexNow, and it turned off the old sitemap ping endpoint. Google will not hear about new URLs from this workflow. Submit the sitemap once:

1. Open [Google Search Console](https://search.google.com/search-console) with the account that should own the site.
2. Add a property. A URL-prefix property for `https://inqreon.com` is enough. A domain property is fine if you can add the DNS TXT record.
3. Verify. The site already loads Google tag `G-1WP83BSRDX`. If this Google account owns that Analytics property, Search Console can verify through it. Otherwise use the DNS TXT record.
4. Open **Sitemaps** and submit `https://inqreon.com/sitemap-index.xml`.

Leave that submission in place. Google re-reads the sitemap on its own schedule. You do not resubmit it after each deploy, and you do not ping Google.

Bing and Yandex receive the IndexNow request. You can also add the same sitemap in Bing Webmaster Tools and Yandex Webmaster if you want their dashboards; that is optional.
