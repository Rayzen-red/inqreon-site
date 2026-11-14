#!/usr/bin/env node
/**
 * POST the built sitemap URLs to IndexNow (Bing, Yandex, and other members).
 *
 * Run after `astro build`. Reads the key from public/<key>.txt (the file
 * IndexNow fetches at the site root) and every <loc> in dist/sitemap*.xml
 * urlsets. sitemap-index.xml is skipped; it lists sitemap files, not pages.
 *
 * Google does not implement IndexNow. Do not add a Google ping here.
 *
 *   node scripts/indexnow.mjs
 *   INDEXNOW_DRY_RUN=1 node scripts/indexnow.mjs   # print URLs, no request
 *
 * A non-200/202 response sets a non-zero exit code. The deploy workflow runs
 * this with continue-on-error so a failed ping does not fail the Pages deploy.
 */
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = 'inqreon.com';
const SITE = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function findKey() {
  const dir = path.join(ROOT, 'public');
  const names = readdirSync(dir).filter((name) => /^[a-f0-9-]{8,128}\.txt$/i.test(name));
  const keys = [];
  for (const name of names) {
    const key = name.slice(0, -'.txt'.length);
    const body = readFileSync(path.join(dir, name), 'utf8').trim();
    if (body === key) keys.push(key);
  }
  if (keys.length !== 1) {
    throw new Error(
      `Expected exactly one IndexNow key file in public/<key>.txt, found ${keys.length}` +
        (keys.length ? `: ${keys.join(', ')}` : ''),
    );
  }
  return keys[0];
}

function pageUrls() {
  const dist = path.join(ROOT, 'dist');
  let names;
  try {
    names = readdirSync(dist).filter((name) => /^sitemap.*\.xml$/i.test(name));
  } catch {
    throw new Error('dist/ is missing. Build the site before submitting to IndexNow.');
  }
  const urls = new Set();
  for (const name of names) {
    const xml = readFileSync(path.join(dist, name), 'utf8');
    if (!xml.includes('<urlset')) continue;
    for (const match of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
      const url = match[1];
      let parsed;
      try {
        parsed = new URL(url);
      } catch {
        continue;
      }
      if (parsed.protocol === 'https:' && parsed.hostname === HOST) urls.add(parsed.href);
    }
  }
  return [...urls];
}

async function main() {
  const key = findKey();
  const urlList = pageUrls();
  const keyLocation = `${SITE}/${key}.txt`;
  if (urlList.length === 0) {
    console.error('IndexNow: no page URLs found in dist/sitemap*.xml');
    process.exitCode = 1;
    return;
  }
  console.log(`IndexNow: ${urlList.length} URL(s) for ${HOST}, keyLocation ${keyLocation}`);
  if (process.env.INDEXNOW_DRY_RUN === '1') {
    console.log('IndexNow: dry run, request not sent');
    for (const url of urlList) console.log(`  ${url}`);
    return;
  }
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key, keyLocation, urlList }),
  });
  const body = (await response.text()).trim();
  console.log(`IndexNow HTTP ${response.status}${body ? ` ${body.slice(0, 300)}` : ''}`);
  if (response.status !== 200 && response.status !== 202) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`IndexNow failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
