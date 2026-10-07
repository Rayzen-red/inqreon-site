// Подсвечивает служебные пометки в Markdown:
//   [PARTNER: Сервис]  -> если в src/data/ads.json для «Сервис» заполнены href, erid, advertiser и title —
//                         рекламная карточка (lib/ad.mjs) сразу ПОСЛЕ абзаца, а пометка из текста убирается;
//                         иначе — заглушка партнёрской ссылки
//   [ПРОВЕРИТЬ ...]    -> факт, который ещё нужно подтвердить
import { isAdComplete, renderAdCard } from '../lib/ad.mjs';

let ADS = {};
const RE = /\[(PARTNER:[^\]]+|ПРОВЕРИТЬ[^\]]*)\]/g;

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function splitText(value, cards) {
  const out = [];
  let last = 0;
  for (const m of value.matchAll(RE)) {
    if (m.index > last) out.push({ type: 'text', value: value.slice(last, m.index) });
    const inner = m[1];
    if (inner.startsWith('PARTNER:')) {
      const name = inner.slice('PARTNER:'.length).trim();
      if (isAdComplete(ADS[name])) {
        cards.push({ type: 'html', value: renderAdCard(ADS[name], name) });
        last = m.index + m[0].length;
        continue;
      }
      out.push({
        type: 'html',
        value: `<span class="ph ph-partner" data-partner="${esc(name)}" title="Место для партнёрской ссылки (пока заглушка)">[PARTNER: ${esc(name)}]</span>`,
      });
    } else {
      out.push({
        type: 'html',
        value: `<mark class="ph ph-check" title="Факт требует проверки">[${esc(inner)}]</mark>`,
      });
    }
    last = m.index + m[0].length;
  }
  if (last < value.length) out.push({ type: 'text', value: value.slice(last) });
  return out;
}

// cards — рекламные карточки, найденные внутри блока верхнего уровня; карточка (блочный <aside>)
// вставляется сразу после этого блока (абзаца, таблицы, списка), а не внутрь него.
function walk(node, cards) {
  if (!node.children) return;
  const next = [];
  for (const child of node.children) {
    RE.lastIndex = 0;
    if (child.type === 'text' && RE.test(child.value)) {
      RE.lastIndex = 0;
      next.push(...splitText(child.value, cards));
    } else if (node.type === 'root') {
      const own = [];
      walk(child, own);
      next.push(child, ...own);
    } else {
      walk(child, cards);
      next.push(child);
    }
  }
  node.children = next;
}

export default function remarkMarkers(options = {}) {
  ADS = options.ads || {};
  return (tree) => walk(tree, []);
}
