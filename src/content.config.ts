import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { RUBRIC_SLUGS } from './data/rubrics';

// Статьи: src/content/articles/*.md
// Файлы генерируются из ../article-XX.md скриптом scripts/sync_articles.py
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(170),
    h1: z.string(),
    slug: z.string().optional(),
    url: z.string().optional(),
    rubric: z.enum(RUBRIC_SLUGS),
    subrubric: z.string().optional(),
    tools: z.array(z.string()).default([]),
    countries: z.array(z.enum(['ru', 'uz', 'kz'])).default([]),
    checkedAt: z.coerce.date(),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    affiliate: z.boolean().default(false),
    draft: z.boolean().default(false),
    main_keyword: z.string().optional(),
    extra_keywords: z.array(z.string()).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    sources: z.array(z.object({ title: z.string().optional(), url: z.string() })).default([]),
  }),
});

export const collections = { articles };
