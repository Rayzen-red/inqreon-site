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

// Новости: src/content/news/ru/<slug>.md и src/content/news/en/<slug>.md
// Не класть в articles. draft: true не попадает в страницы, sitemap и RSS,
// пока сборка не запущена с SHOW_DRAFTS=1 (по умолчанию выключено).
const news = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/news',
    // Keep ru/ and en/ in the id. The same slug may exist in both languages.
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z
    .object({
      title: z.string().min(1).max(70),
      slug: z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .refine((value) => value !== 'page' && value !== 'rss', 'reserved slug'),
      date: z.coerce.date(),
      lang: z.enum(['ru', 'en']),
      description: z.string().min(1).max(170),
      image: z
        .string()
        .regex(/^\/images\/news\/[a-z0-9.-]+\.(webp|avif|png|jpe?g)$/)
        .optional(),
      imageAlt: z.string().min(1).max(240).optional(),
      sources: z
        .array(
          z.object({
            title: z.string().min(1),
            url: z
              .string()
              .url()
              .refine((value) => value.startsWith('https://') || value.startsWith('http://'), 'http(s) only'),
          }),
        )
        .min(1),
      translationKey: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      tags: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).min(1).max(3),
      cta: z.enum(['scan', 'fix', 'telegram']).optional(),
      draft: z.boolean(),
    })
    .refine((data) => !data.image || !!data.imageAlt, {
      message: 'imageAlt is required when image is set',
      path: ['imageAlt'],
    }),
});

// Заметки об инструментах: src/content/guides/{ru,en}/*.md
// Тот же принцип, что у новостей: draft: true не попадает на сайт,
// пока сборка не запущена с SHOW_DRAFTS=1.
const guides = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/guides',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z
    .object({
      title: z.string().min(1).max(70),
      slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      date: z.coerce.date(),
      lang: z.enum(['ru', 'en']),
      description: z.string().min(1).max(170),
      image: z.string().regex(/^\/images\/ai-tools\/[a-z0-9.-]+\.webp$/),
      imageAlt: z.string().min(1).max(240),
      sources: z
        .array(
          z.object({
            title: z.string().min(1),
            url: z.string().url(),
          }),
        )
        .min(1),
      translationKey: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
      tags: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).min(1).max(3),
      cta: z.enum(['scan', 'fix', 'telegram']),
      draft: z.boolean(),
    })
    .refine((data) => data.slug === data.translationKey, {
      message: 'slug and translationKey must match',
      path: ['translationKey'],
    }),
});

export const collections = { articles, news, guides };
