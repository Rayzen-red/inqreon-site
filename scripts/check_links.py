#!/usr/bin/env python3
"""Проверяет, что все внутренние ссылки в dist/ ведут на существующие файлы (нет 404).

Учитываются href и src, начинающиеся с «/» или «https://inqreon.com».
Запуск после сборки: python3 scripts/check_links.py   (код выхода 1, если есть битые ссылки)
"""
import re
import sys
from collections import defaultdict
from pathlib import Path
from urllib.parse import unquote, urlparse

DIST = Path(__file__).resolve().parent.parent / 'dist'
ATTR = re.compile(r'''(?:href|src)\s*=\s*["']([^"']+)["']''')


def target(url):
    if url.startswith('https://inqreon.com'):
        url = url[len('https://inqreon.com'):] or '/'
    if not url.startswith('/') or url.startswith('//'):
        return None
    path = unquote(urlparse(url).path)
    p = DIST / path.lstrip('/')
    if path.endswith('/'):
        return p / 'index.html'
    return p


def main():
    if not DIST.exists():
        sys.exit('Нет папки dist — сначала npm run build')
    pages = sorted(DIST.rglob('*.html'))
    broken = defaultdict(set)
    checked = 0
    for page in pages:
        html = page.read_text(encoding='utf-8', errors='ignore')
        for url in ATTR.findall(html):
            t = target(url)
            if t is None:
                continue
            checked += 1
            if not t.exists():
                broken[url].add(str(page.relative_to(DIST)))
    print(f'HTML-страниц: {len(pages)}, внутренних ссылок проверено: {checked}, битых: {len(broken)}')
    for url, where in sorted(broken.items()):
        print(f'  404: {url}  ← {", ".join(sorted(where))}')
    sys.exit(1 if broken else 0)


if __name__ == '__main__':
    main()
