import { getCollection } from 'astro:content';
import { RUBRICS } from '../data/rubrics';
import { SITE, formatDate } from '../data/site';

export type Cover = {
  src: string;
  alt: string;
  kind: 'illustration' | 'space';
  note: string;
};

/** Абстрактные обложки статей: градиент, шум и иллюстрация. */
const COVERS: Record<string, Cover> = {
  deepseek: {
    src: '/concepts/covers/deepseek.svg',
    alt: 'Абстрактная обложка материала о DeepSeek',
    kind: 'illustration',
    note: 'Иллюстрация обложки',
  },
  'besplatnye-neyroseti': {
    src: '/concepts/covers/free.svg',
    alt: 'Абстрактная обложка материала о бесплатных нейросетях',
    kind: 'illustration',
    note: 'Иллюстрация обложки',
  },
  'agregatory-neyrosetey': {
    src: '/concepts/covers/hubs.svg',
    alt: 'Абстрактная обложка материала об агрегаторах',
    kind: 'illustration',
    note: 'Иллюстрация обложки',
  },
};

/** Иллюстрации рубрики «Космос и наука» — свои кадры редакции, webp. */
export const HERO = [
  {
    src: '/concepts/covers/iss-night.webp',
    alt: 'Ночная Земля, иллюстрация рубрики Космос и наука',
    kind: 'space' as const,
    note: 'Иллюстрация рубрики «Космос и наука»',
  },
  {
    src: '/concepts/covers/iss-sunrise.webp',
    alt: 'Рассвет на орбите, иллюстрация рубрики Космос и наука',
    kind: 'space' as const,
    note: 'Иллюстрация рубрики «Космос и наука»',
  },
  {
    src: '/concepts/covers/iss-astronaut.webp',
    alt: 'Космонавт у иллюминатора, иллюстрация рубрики Космос и наука',
    kind: 'space' as const,
    note: 'Иллюстрация рубрики «Космос и наука»',
  },
];

export const SPACE = {
  night: HERO[0],
  sunrise: HERO[1],
  astronaut: HERO[2],
};

export const BACKDROPS = HERO;

/** Карточки инструментов ведут на уже опубликованные обзоры. Логотипы — монограммы-заглушки. */
export const TOOLS = [
  { name: 'DeepSeek', mark: 'Ds', tone: 'cyan', text: 'Регистрация, режимы, промпты и API.', href: '/neyroseti/deepseek/' },
  { name: 'Алиса AI', mark: 'А', tone: 'violet', text: 'Бесплатный чат на русском.', href: '/neyroseti/besplatnye-neyroseti/' },
  { name: 'ГигаЧат', mark: 'Г', tone: 'mint', text: 'Бесплатный чат на русском.', href: '/neyroseti/besplatnye-neyroseti/' },
  { name: 'Qwen', mark: 'Q', tone: 'amber', text: 'Бесплатный чат на русском.', href: '/neyroseti/besplatnye-neyroseti/' },
  { name: 'ChatGPT', mark: 'G', tone: 'green', text: 'Бесплатный тариф и лимиты.', href: '/neyroseti/besplatnye-neyroseti/' },
  { name: 'Claude', mark: 'C', tone: 'sand', text: 'Бесплатный тариф и лимиты.', href: '/neyroseti/besplatnye-neyroseti/' },
  { name: 'Gemini', mark: 'Ge', tone: 'blue', text: 'Бесплатный тариф и лимиты.', href: '/neyroseti/besplatnye-neyroseti/' },
  { name: 'BotHub', mark: 'B', tone: 'rose', text: 'Агрегатор моделей для России и СНГ.', href: '/neyroseti/agregatory-neyrosetey/' },
  { name: 'GPTunneL', mark: 'Gt', tone: 'indigo', text: 'Агрегатор моделей для России и СНГ.', href: '/neyroseti/agregatory-neyrosetey/' },
  { name: 'Chad', mark: 'Ch', tone: 'coral', text: 'Агрегатор моделей для России и СНГ.', href: '/neyroseti/agregatory-neyrosetey/' },
];

export async function loadConceptHome() {
  const all = await getCollection('articles', ({ data }) => !data.draft);
  const articles = all
    .filter((a) => {
      const slug = a.data.slug ?? a.id;
      return !slug.includes('vpn') && !a.id.includes('vpn');
    })
    .sort((a, b) => +b.data.checkedAt - +a.data.checkedAt)
    .map((a) => {
      const slug = a.data.slug ?? a.id;
      const cover = COVERS[slug];
      if (!cover) return null;
      return {
        title: a.data.title,
        description: a.data.description,
        href: a.data.url ?? `/${a.data.rubric}/${slug}/`,
        rubric: a.data.rubric,
        rubricName: RUBRICS.find((r) => r.slug === a.data.rubric)?.name ?? '',
        dateLabel: formatDate(a.data.checkedAt),
        cover,
      };
    })
    .filter((a): a is NonNullable<typeof a> => a !== null);

  const space = RUBRICS.find((r) => r.slug === 'kosmos-i-nauka');
  return {
    articles,
    rubrics: RUBRICS.filter((r) => r.inNav),
    allRubrics: RUBRICS,
    space,
    site: SITE,
  };
}
