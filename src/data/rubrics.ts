// Рубрики и URL-шаблоны — по structure.md (/<rubrika>/<slug>/)
export interface Rubric {
  slug: string;
  name: string;
  description: string;
  inNav: boolean;
}

export const RUBRICS: Rubric[] = [
  { slug: 'neyroseti', name: 'Нейросети', description: 'Обзоры сервисов, которые работают в РФ, УЗ и КЗ напрямую: агрегаторы, чат-боты, картинки, видео и голос.', inNav: true },
  { slug: 'dlya-raboty', name: 'Для работы', description: 'Письма, отчёты, таблицы, презентации, код и резюме с помощью нейросетей.', inNav: true },
  { slug: 'dlya-ucheby', name: 'Для учёбы', description: 'Конспекты, объяснение тем, подготовка к экзаменам и языки — с акцентом на честное использование.', inNav: true },
  { slug: 'prompty', name: 'Промпты', description: 'Готовые запросы под задачи и гайды по составлению промптов.', inNav: true },
  { slug: 'sravneniya', name: 'Сравнения', description: '«X или Y»: сравнительные таблицы нейросетей на реальных задачах.', inNav: true },
  { slug: 'dostup-i-oplata', name: 'Доступ и оплата', description: 'Какие сервисы официально доступны в России, Узбекистане и Казахстане и как за них платить.', inNav: true },
  { slug: 'kosmos-i-nauka', name: 'Космос и наука', description: 'Научпоп о космосе, астрокалендарь и то, как ИИ помогает науке.', inNav: true },
  { slug: 'instrumenty', name: 'Каталог инструментов', description: 'Карточки сервисов: доступность по странам, цены с датой проверки, ссылки на наши статьи.', inNav: false },
];

export const RUBRIC_SLUGS = RUBRICS.map((r) => r.slug) as [string, ...string[]];

export function getRubric(slug: string): Rubric {
  const r = RUBRICS.find((x) => x.slug === slug);
  if (!r) throw new Error(`Неизвестная рубрика: ${slug}`);
  return r;
}
