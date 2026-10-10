// Общие настройки сайта Inqreon
export const SITE = {
  name: 'Inqreon',
  url: 'https://inqreon.com',
  tagline: 'Нейросети для работы и учёбы в России и СНГ',
  description:
    'Inqreon — что из нейросетей реально работает в России, Узбекистане и Казахстане: обзоры, сравнения, цены с датой проверки и промпты.',
  telegram: 'https://t.me/Inqreon',
  youtube: 'https://www.youtube.com/@inqreon',
  instagram: 'https://www.instagram.com/inqreon/',
  email: 'raydzim.group@gmail.com',
  owner: 'Raydzim Group',
  ownerCountry: 'Узбекистан',
  locale: 'ru_RU',
  lang: 'ru',
  ogImage: '/og-default.png',
};

export const COUNTRY_LABELS: Record<string, string> = {
  ru: 'Россия',
  uz: 'Узбекистан',
  kz: 'Казахстан',
};

export function formatDate(d: Date): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}
