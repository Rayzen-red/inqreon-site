/**
 * Custom-program copy and order links. Amounts come from ./prices.ts.
 * English is /en/. Russian is /uslugi/.
 */
import { EMAIL, HAS_UPWORK, TELEGRAM_URL, UPWORK_URL } from './offer';
import { PRICES, formatPrice } from './prices';

export { TELEGRAM_URL };

export type Lang = 'en' | 'ru';
export type AutoId = 'light' | 'medium' | 'large';

export const SERVICE_PATH = {
  en: '/en/services/',
  ru: '/uslugi/',
} as const;

function mail(subject: string, body: string): string {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function enBody(intro: string): string {
  return `Hi,

${intro}

What should be automated:
Which services:
Deadline:

I won't send passwords or secret keys in this email.
`;
}

function ruBody(intro: string): string {
  return `Здравствуйте,

${intro}

Что автоматизировать:
Какие сервисы:
Срок:

Не пришлю пароли и секретные ключи в этом письме.
`;
}

export interface AutomationCard {
  id: AutoId;
  name: string;
  /** Shown as the big price. A phrase when there is no amount. */
  priceLabel: string;
  words: boolean;
  text: string;
  examples: string[];
  cta: string;
  href: string;
  external: boolean;
}

function hrefFor(subject: string, body: string): { href: string; external: boolean } {
  if (HAS_UPWORK) return { href: UPWORK_URL, external: true };
  return { href: mail(subject, body), external: false };
}

export function automationSection(lang: Lang): { title: string } {
  if (lang === 'ru') return { title: 'Программы и автоматизации под ваш запрос' };
  return { title: 'Custom programs & automations' };
}

export function automationCards(lang: Lang): AutomationCard[] {
  const light = formatPrice(PRICES.automation.light);
  const medium = formatPrice(PRICES.automation.medium);
  const ru = lang === 'ru';

  const specs: Array<Omit<AutomationCard, 'href' | 'external'> & { subject: string; body: string }> = ru
    ? [
        {
          id: 'light',
          name: 'Лёгкая программа',
          priceLabel: light,
          words: false,
          text: 'Одна простая задача за 1–2 дня + инструкция.',
          examples: [
            'Парсер сайта в CSV/Excel',
            'Простой Telegram-бот',
            'Сценарий Zapier/Make/n8n между двумя сервисами',
            'Скрипт Google Таблиц',
          ],
          cta: `Заказать лёгкую программу — ${light}`,
          subject: `Заявка на автоматизацию — Лёгкая программа ${light}`,
          body: ruBody(`Нужна лёгкая программа (${light}).`),
        },
        {
          id: 'medium',
          name: 'Средняя автоматизация',
          priceLabel: medium,
          words: false,
          text: '3–4 сервиса и несколько шагов, 3–7 дней. Обработка ошибок и 7 дней бесплатных правок.',
          examples: ['ИИ-обработка писем или заявок', 'Бот с базой или оплатой', 'Парсер по расписанию'],
          cta: `Заказать среднюю автоматизацию — ${medium}`,
          subject: `Заявка на автоматизацию — Средняя автоматизация ${medium}`,
          body: ruBody(`Нужна средняя автоматизация (${medium}).`),
        },
        {
          id: 'large',
          name: 'Большой проект',
          priceLabel: 'Цена по договорённости',
          words: true,
          text: '',
          examples: [],
          cta: 'Запросить большой проект',
          subject: 'Заявка на автоматизацию — Большой проект',
          body: ruBody('Нужен большой проект. Цена по договорённости.'),
        },
      ]
    : [
        {
          id: 'light',
          name: 'Light program',
          priceLabel: light,
          words: false,
          text: 'One simple task, done in 1–2 days, plus a short how-to guide.',
          examples: [
            'A website scraper to CSV or Excel',
            'A simple Telegram bot',
            'A Zapier, Make, or n8n scenario between two services',
            'A Google Sheets script',
          ],
          cta: `Order a Light program — ${light}`,
          subject: `Automation request — Light program ${light}`,
          body: enBody(`I'd like a Light program (${light}).`),
        },
        {
          id: 'medium',
          name: 'Medium automation',
          priceLabel: medium,
          words: false,
          text: '3–4 services and several steps, in 3–7 days. Includes error handling and 7 days of free revisions.',
          examples: [
            'AI processing of emails or leads',
            'A bot with a database or payments',
            'A scheduled scraper',
          ],
          cta: `Order a Medium automation — ${medium}`,
          subject: `Automation request — Medium automation ${medium}`,
          body: enBody(`I'd like a Medium automation (${medium}).`),
        },
        {
          id: 'large',
          name: 'Large project',
          priceLabel: 'Price on request',
          words: true,
          text: '',
          examples: [],
          cta: 'Request a Large project',
          subject: 'Automation request — Large project',
          body: enBody('I\'d like a large project. Price on request.'),
        },
      ];

  return specs.map(({ subject, body, ...card }) => ({
    ...card,
    ...hrefFor(subject, body),
  }));
}

/** JSON-LD offers. Large has no numeric price. */
export function automationOffers(lang: Lang): object[] {
  const amount: Record<AutoId, number | null> = {
    light: PRICES.automation.light,
    medium: PRICES.automation.medium,
    large: null,
  };
  return automationCards(lang).map((card) => {
    const price = amount[card.id];
    const description = [card.text, ...card.examples].filter(Boolean).join(' ');
    return {
      '@type': 'Offer',
      name: card.name,
      ...(description ? { description } : { description: card.priceLabel }),
      priceCurrency: PRICES.currency,
      ...(price === null ? {} : { price: String(price) }),
    };
  });
}
