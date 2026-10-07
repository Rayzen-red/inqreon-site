#!/usr/bin/env python3
"""Переносит статьи-исходники ../../article-XX.md в контент-коллекцию Astro.

Что делает:
- берёт frontmatter исходника (title, description, h1, slug, rubric, ...);
- убирает из тела служебные строки «**Title (до 60 символов):**» и «**Meta description…**»,
  H1 (его выводит шаблон из поля h1), вводную плашку «> **Проверено…**» (дату и
  раскрытие партнёрок выводит шаблон) и хвост «### Источники…»;
- извлекает FAQ из раздела «## Частые вопросы» в поле faq (для FAQPage schema);
- собирает список источников из article-XX-sources.md в поле sources.

Запуск: python3 scripts/sync_articles.py   (из папки site/astro)
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent          # site/astro
SRC_DIR = ROOT.parent                                    # site/
OUT_DIR = ROOT / 'src' / 'content' / 'articles'
ORDER = ['title', 'description', 'h1', 'slug', 'url', 'rubric', 'subrubric', 'tools', 'countries',
         'checkedAt', 'publishedAt', 'updatedAt', 'affiliate', 'draft', 'main_keyword', 'extra_keywords']


def parse_fm(text):
    m = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    if not m:
        raise ValueError('нет frontmatter')
    data = {}
    for line in m.group(1).splitlines():
        if not line.strip() or ':' not in line:
            continue
        k, v = line.split(':', 1)
        v = v.strip()
        if v.startswith('['):
            data[k] = json.loads(v) if '"' in v else [x.strip() for x in v.strip('[]').split(',') if x.strip()]
        elif v.startswith('"'):
            data[k] = json.loads(v)
        elif v in ('true', 'false'):
            data[k] = v == 'true'
        else:
            data[k] = v
    return data, text[m.end():]


def plain(md):
    md = re.sub(r'\[([^\]]+)\]\((?:[^)]+)\)', r'\1', md)     # ссылки -> текст
    md = md.replace('**', '').replace('`', '')
    return re.sub(r'\s+', ' ', md).strip()


def extract_faq(body):
    m = re.search(r'^## Частые вопросы\s*\n(.*?)(?=^## )', body, re.S | re.M)
    if not m:
        return []
    faq = []
    for block in re.split(r'\n\s*\n', m.group(1).strip()):
        lines = block.strip().splitlines()
        if len(lines) >= 2 and re.match(r'^\*\*.+\*\*$', lines[0].strip()):
            faq.append({'q': plain(lines[0]), 'a': plain(' '.join(lines[1:]))})
    return faq


def extract_sources(path):
    if not path.exists():
        return []
    out, seen = [], set()
    for line in path.read_text(encoding='utf-8').splitlines():
        if line.startswith('## ') and re.search(r'Партн|осталось|Правило', line):
            break                                   # служебные разделы не публикуем
        if not line.startswith('|') or line.startswith('|---'):
            continue
        cells = [c.strip() for c in line.strip('|').split('|')]
        title = plain(cells[0]) if cells else ''
        for u in re.findall(r'https?://[^\s|;)]+', line):
            after = line.split(u, 1)[1][:40]
            if 'не открылась' in after or u in seen:
                continue
            seen.add(u)
            out.append({'title': title if 0 < len(title) <= 40 else '', 'url': u.rstrip('.,')})
    return out


def clean_body(body):
    body = re.sub(r'^\*\*(Title|Meta description)[^\n]*\n', '', body, flags=re.M)
    body = re.sub(r'^# [^\n]+\n', '', body, count=1, flags=re.M)
    body = re.sub(r'^> \*\*Проверено[^\n]*\n(?:>[^\n]*\n)*', '', body, count=1, flags=re.M)
    body = re.sub(r'\n-{3,}\s*\n+### Источники.*\Z', '\n', body, flags=re.S)
    return body.strip() + '\n'


def yaml_value(v):
    if isinstance(v, bool):
        return 'true' if v else 'false'
    if isinstance(v, str) and re.fullmatch(r'\d{4}-\d{2}-\d{2}', v):
        return v
    return json.dumps(v, ensure_ascii=False)


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    files = sorted(SRC_DIR.glob('article-[0-9][0-9].md'))
    if not files:
        sys.exit('Нет файлов article-XX.md')
    for f in files:
        fm, body = parse_fm(f.read_text(encoding='utf-8'))
        fm['faq'] = extract_faq(body)
        fm['sources'] = extract_sources(f.with_name(f.stem + '-sources.md'))
        keys = [k for k in ORDER if k in fm] + [k for k in fm if k not in ORDER]
        head = '\n'.join(f'{k}: {yaml_value(fm[k])}' for k in keys)
        note = f'# Сгенерировано scripts/sync_articles.py из {f.name}. Правьте исходник, а не этот файл.\n'
        out = OUT_DIR / f"{fm['slug']}.md"
        out.write_text(f'---\n{note}{head}\n---\n\n{clean_body(body)}', encoding='utf-8')
        print(f'{f.name} -> {out.relative_to(ROOT)} (faq: {len(fm["faq"])}, sources: {len(fm["sources"])})')


if __name__ == '__main__':
    main()
