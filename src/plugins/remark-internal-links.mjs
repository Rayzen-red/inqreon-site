// Скрывает внутренние ссылки на страницы, которых ещё нет в сборке.
//  - В абзаце «Читайте также: …» несуществующие ссылки удаляются вместе с разделителями
//    (если ссылок не осталось — абзац удаляется целиком).
//  - В обычном тексте ссылка превращается в простой текст (слова остаются, ссылка — нет).
// Список существующих URL передаётся из astro.config.mjs (опция `valid`).

function normalize(url) {
  let path = url.split('#')[0].split('?')[0];
  if (path.startsWith('https://inqreon.com')) path = path.slice('https://inqreon.com'.length) || '/';
  if (!path.startsWith('/')) return null;            // относительные/внешние ссылки не трогаем
  if (/\.[a-z0-9]+$/i.test(path)) return path;       // файлы (картинки, xml) как есть
  return path.endsWith('/') ? path : path + '/';
}

const isInternal = (url) => typeof url === 'string' && (url.startsWith('/') || url.startsWith('https://inqreon.com'));
const textOf = (n) => (n.type === 'text' ? n.value : (n.children || []).map(textOf).join(''));

export default function remarkInternalLinks(options = {}) {
  const valid = new Set(options.valid || []);
  const ok = (url) => {
    const p = normalize(url);
    return p === null || valid.has(p);
  };
  const removed = options.report || [];

  function walk(node) {
    if (!node.children) return;
    // «Читайте также»
    if (node.type === 'paragraph' && /^Читайте также/.test(textOf(node).trim())) {
      const head = node.children.filter((c) => c.type !== 'link' && !/^\s*·?\s*$/.test(textOf(c)));
      const links = node.children.filter((c) => c.type === 'link');
      const keep = links.filter((l) => !isInternal(l.url) || ok(l.url));
      links.filter((l) => !keep.includes(l)).forEach((l) => removed.push(l.url));
      if (!keep.length) { node.remove = true; return; }
      const kids = [...head.filter((c) => c.type === 'strong'), { type: 'text', value: ' ' }];
      keep.forEach((l, i) => { if (i) kids.push({ type: 'text', value: ' · ' }); kids.push(l); });
      node.children = kids;
      return;
    }
    const next = [];
    for (const child of node.children) {
      if (child.type === 'link' && isInternal(child.url) && !ok(child.url)) {
        removed.push(child.url);
        walk(child);
        next.push(...child.children);           // оставить текст ссылки
        continue;
      }
      walk(child);
      if (!child.remove) next.push(child);
    }
    node.children = next;
  }
  return (tree) => walk(tree);
}
