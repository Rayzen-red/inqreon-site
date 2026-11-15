/**
 * Aggregators named in the published Russian comparison
 * (src/content/articles/agregatory-neyrosetey.md, checked 2026-10-07).
 * Roles are the article's own distinctions: chat, API, or both.
 * This file does not add prices, scores, or country claims.
 */

export interface Aggregator {
  id: string;
  name: string;
  /** Chat for people, an API, or both. From the article's table. */
  kind: { en: string; ru: string };
  role: { en: string; ru: string };
}

export const AGGREGATORS: Aggregator[] = [
  {
    id: 'chad',
    name: 'Chad',
    kind: { en: 'Chat, apps, and an API', ru: 'Чат, приложения и API' },
    role: {
      en: 'One subscription for many text, image, and video models.',
      ru: 'Подписка, в которой много текстовых, картиночных и видеомоделей.',
    },
  },
  {
    id: 'bothub',
    name: 'BotHub',
    kind: { en: 'Chat and an API', ru: 'Чат и API' },
    role: {
      en: 'A chat plus an API. The Russian article records a free starting balance.',
      ru: 'Чат и API. В статье указан бесплатный стартовый баланс.',
    },
  },
  {
    id: 'gptunnel',
    name: 'GPTunneL',
    kind: { en: 'Chat and an API', ru: 'Чат и API' },
    role: {
      en: 'Pay for use. Their own Grom 1.5 model is free, according to their price FAQ.',
      ru: 'Оплата за расход. Своя модель Grom 1.5 бесплатна — так написано в их FAQ по ценам.',
    },
  },
  {
    id: 'vsegpt',
    name: 'VseGPT',
    kind: { en: 'Chat and an API', ru: 'Чат и API' },
    role: {
      en: 'A web chat and an OpenAI-compatible API, with trial credits after sign-up.',
      ru: 'Веб-чат и API, совместимый с OpenAI. После регистрации по почте дают пробные кредиты.',
    },
  },
  {
    id: 'aitunnel',
    name: 'AITUNNEL',
    kind: { en: 'API and a web chat', ru: 'API и веб-чат' },
    role: {
      en: 'Built around one API key for a large model list, with a simple chat as well.',
      ru: 'Сделан вокруг одного API-ключа на большой список моделей. Простой чат тоже есть.',
    },
  },
  {
    id: 'proxyapi',
    name: 'ProxyAPI',
    kind: { en: 'API', ru: 'API' },
    role: {
      en: 'An API aimed at people already using the official OpenAI or Anthropic SDKs.',
      ru: 'API для тех, кто уже пишет под официальные SDK OpenAI или Anthropic.',
    },
  },
  {
    id: 'polza',
    name: 'Polza.ai',
    kind: { en: 'API and a web studio', ru: 'API и веб-студия' },
    role: {
      en: 'An OpenAI-compatible API. The site does not list a free tier.',
      ru: 'API, совместимый с OpenAI. Бесплатного тарифа на сайте нет.',
    },
  },
  {
    id: 'genapi',
    name: 'GenAPI',
    kind: { en: 'API', ru: 'API' },
    role: {
      en: 'An API for text and for image, audio, video, and 3D generation.',
      ru: 'API для текста и для картинок, звука, видео и 3D.',
    },
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    kind: { en: 'API and a chat', ru: 'API и чат' },
    role: {
      en: 'An international router. The free plan includes 25+ models, with a daily cap.',
      ru: 'Международный роутер. На бесплатном плане больше 25 моделей и дневной лимит запросов.',
    },
  },
];

export const COMPARE_ARTICLE = '/neyroseti/agregatory-neyrosetey/';
