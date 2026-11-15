import { getCollection, type CollectionEntry } from 'astro:content';
import { showDrafts, type Lang } from './news';

export type GuideEntry = CollectionEntry<'guides'>;

export function isPublicGuide(entry: GuideEntry): boolean {
  return showDrafts() || !entry.data.draft;
}

export function guidePath(lang: Lang, slug: string): string {
  return lang === 'en' ? `/en/tools/${slug}/` : `/instrumenty/note/${slug}/`;
}

const GUIDE_ORDER = ['chatgpt', 'gemini', 'claude', 'deepseek', 'grok', 'perplexity', 'microsoft-copilot', 'lovable', 'cursor', 'gamma'];

export async function loadGuides(lang?: Lang): Promise<GuideEntry[]> {
  const entries = await getCollection('guides');
  for (const entry of entries) {
    const parts = entry.id.split('/');
    const fileSlug = parts[parts.length - 1] ?? '';
    if (parts[0] !== entry.data.lang) {
      throw new Error(`Guide ${entry.id}: folder does not match lang`);
    }
    if (fileSlug !== entry.data.slug) {
      throw new Error(`Guide ${entry.id}: file name must match slug`);
    }
  }
  return entries
    .filter((entry) => isPublicGuide(entry) && (!lang || entry.data.lang === lang))
    .sort((a, b) => {
      const ai = GUIDE_ORDER.indexOf(a.data.slug);
      const bi = GUIDE_ORDER.indexOf(b.data.slug);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi) || a.data.slug.localeCompare(b.data.slug);
    });
}
