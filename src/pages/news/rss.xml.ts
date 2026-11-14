import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { loadNews, newsPath } from '../../lib/news';

export async function GET(context: APIContext) {
  const items = await loadNews('ru');
  return rss({
    title: 'Inqreon — новости',
    description: 'Короткие новости об ИИ и о том, что проверить перед запуском сайта или приложения.',
    site: context.site ?? 'https://inqreon.com',
    trailingSlash: true,
    customData: '<language>ru</language>',
    items: items.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: newsPath('ru', entry.data.slug),
      categories: [...entry.data.tags],
    })),
  });
}
