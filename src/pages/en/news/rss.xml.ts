import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { loadNews, newsPath } from '../../../lib/news';

export async function GET(context: APIContext) {
  const items = await loadNews('en');
  return rss({
    title: 'Inqreon — AI news',
    description: 'Short AI news, and what to check before a generated site or app meets real users.',
    site: context.site ?? 'https://inqreon.com',
    trailingSlash: true,
    customData: '<language>en</language>',
    items: items.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: newsPath('en', entry.data.slug),
      categories: [...entry.data.tags],
    })),
  });
}
