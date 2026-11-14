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
 * Each request times out, and transient failures (including a key file that
 * Pages has not served yet) are retried. Lists longer than 10,000 URLs are
 * sent in batches of 10,000, which is the IndexNow limit.
 */
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = 'inqreon.com';
const SITE = `https://${HOST}`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BATCH_SIZE = 10000;
const ATTEMPTS = 3;
const TIMEOUT_MS = 20_000;
const RETRY_STATUSES = new Set([403, 408, 429, 500, 502, 503, 504]);

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

function batches(urls) {
  const chunks = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) chunks.push(urls.slice(i, i + BATCH_SIZE));
  return chunks;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function submitBatch(payload, batchNo, batchCount) {
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      const body = (await response.text()).trim();
      const label = batchCount > 1 ? ` batch ${batchNo}/${batchCount}` : '';
      console.log(
        `IndexNow HTTP ${response.status}${label} (attempt ${attempt}, ${payload.urlList.length} URL(s))${body ? ` ${body.slice(0, 300)}` : ''}`,
      );
      if (response.status === 200 || response.status === 202) return true;
      if (!RETRY_STATUSES.has(response.status)) return false;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`IndexNow request failed (attempt ${attempt}): ${message}`);
    }
    if (attempt < ATTEMPTS) {
      const delay = attempt === 1 ? 5_000 : 15_000;
      console.log(`IndexNow: retrying in ${delay / 1000}s`);
      await sleep(delay);
    }
  }
  return false;
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
  const chunks = batches(urlList);
  console.log(`IndexNow: ${urlList.length} URL(s) for ${HOST} in ${chunks.length} request(s), keyLocation ${keyLocation}`);
  if (process.env.INDEXNOW_DRY_RUN === '1') {
    console.log('IndexNow: dry run, request not sent');
    for (const url of urlList) console.log(`  ${url}`);
    return;
  }
  let failed = false;
  for (let i = 0; i < chunks.length; i++) {
    const ok = await submitBatch({ host: HOST, key, keyLocation, urlList: chunks[i] }, i + 1, chunks.length);
    if (!ok) failed = true;
  }
  if (failed) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`IndexNow failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
