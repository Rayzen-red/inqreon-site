export type Picture = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const COVERS: Record<string, Picture> = {
  deepseek: {
    src: '/images/guides/deepseek.webp',
    alt: 'Синее стекло на деревянном столе, без надписей',
    width: 1280,
    height: 720,
  },
  'besplatnye-neyroseti': {
    src: '/images/guides/free.webp',
    alt: 'Четыре чистые карточки на льне, без надписей',
    width: 1280,
    height: 720,
  },
  'agregatory-neyrosetey': {
    src: '/images/guides/hubs.webp',
    alt: 'Пустые рамки разного размера на полке, без картин и надписей',
    width: 1280,
    height: 720,
  },
  'neyroseti-dostupnye-v-rossii-i-sng': {
    src: '/images/guides/access.webp',
    alt: 'Приоткрытая дверь, льняная занавеска и закрытый блокнот на пороге',
    width: 1280,
    height: 720,
  },
  gigachat: {
    src: '/images/guides/gigachat.webp',
    alt: 'Зелёный телефон и стопка чистых карточек на столе, без надписей',
    width: 1280,
    height: 720,
  },
};

export function ogImageFor(id: string): string {
  return COVERS[id] ? `/og/${id}.png` : '/og-default.png';
}

export function coverFor(id: string): Picture {
  return (
    COVERS[id] ?? {
      src: '/images/guides/access.webp',
      alt: 'Обложка материала Inqreon',
      width: 1280,
      height: 720,
    }
  );
}

export const SPACE_IMAGES: Picture[] = [
  {
    src: '/concepts/covers/iss-night.webp',
    alt: 'Ночная Земля с орбиты',
    width: 1280,
    height: 720,
  },
  {
    src: '/concepts/covers/iss-sunrise.webp',
    alt: 'Рассвет на орбите',
    width: 720,
    height: 1280,
  },
  {
    src: '/concepts/covers/iss-astronaut.webp',
    alt: 'Космонавт у иллюминатора',
    width: 720,
    height: 1280,
  },
];

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
