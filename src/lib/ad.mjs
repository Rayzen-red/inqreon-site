// Рекламная карточка для реферальной ссылки — по шаблону
// /workspace/inqreon/analytics/affiliate-links-marking.md, раздел 6.2:
//   пометка «Реклама» + рекламодатель (+ ИНН/сайт) + erid в кликовой ссылке (?erid=) и в подписи,
//   rel="sponsored nofollow". Без erid или рекламодателя ссылка НЕ выводится.
// Общая функция для компонента AdCard.astro и для remark-плагина (замена [PARTNER: …] в статьях).

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Все обязательные поля на месте? */
export function isAdComplete(ad) {
  return Boolean(ad && ad.href && ad.erid && ad.advertiser && ad.title);
}

/** Добавляет erid в кликовую ссылку параметром ?erid= (если его там ещё нет). */
export function withErid(href, erid) {
  const url = new URL(href);
  if (!url.searchParams.has('erid')) url.searchParams.set('erid', erid);
  return url.toString();
}

/** Подпись: «Реклама. ООО «…», ИНН …, site.ru. erid: …» */
export function adCaption(ad) {
  const parts = [ad.advertiser];
  if (ad.inn) parts.push(`ИНН ${ad.inn}`);
  if (ad.site) parts.push(ad.site);
  return `Реклама. ${parts.join(', ')}. erid: ${ad.erid}`;
}

/** HTML карточки. Для неполных данных — видимая заглушка без ссылки. */
export function renderAdCard(ad, name = '') {
  if (!isAdComplete(ad)) {
    const label = name || ad?.title || 'партнёр';
    return `<span class="ph ph-partner" data-partner="${esc(label)}" title="Нет erid/рекламодателя — ссылка не выводится">[PARTNER: ${esc(label)}]</span>`;
  }
  const label = ad.bilingual ? 'Реклама / Reklama' : 'Реклама';
  const cta = ad.cta || `Перейти на ${name || 'сайт'}`;
  return [
    `<aside class="ad-card" data-partner="${esc(name)}" data-erid="${esc(ad.erid)}">`,
    `<span class="ad-label">${label}</span>`,
    `<p class="ad-title">${esc(ad.title)}</p>`,
    ad.text ? `<p class="ad-text">${esc(ad.text)}</p>` : '',
    `<a class="ad-link" href="${esc(withErid(ad.href, ad.erid))}" rel="sponsored nofollow noopener" target="_blank">${esc(cta)}</a>`,
    `<small class="ad-caption">${esc(adCaption(ad))}</small>`,
    `</aside>`,
  ].join('');
}
