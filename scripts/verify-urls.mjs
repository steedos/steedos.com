#!/usr/bin/env node
/**
 * Check the new site against cms-export/urls.csv, the inventory of every URL
 * the old site answered (see scripts/export-cms.mjs).
 *
 *   node scripts/verify-urls.mjs                       # check dist/ + redirect rules
 *   node scripts/verify-urls.mjs --base http://localhost:3000   # check a running server
 *
 * For each URL the old site served with 200, the new site must serve a page;
 * for each old redirect, it must redirect to the same final place. Title and
 * description changes are reported (not failures) so SEO drift is visible.
 * Exits non-zero if any URL is missing or redirects somewhere else.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveRedirect } from './gen-nginx-redirects.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const argIndex = process.argv.indexOf('--base');
const BASE = argIndex > 0 ? process.argv[argIndex + 1].replace(/\/$/, '') : null;
const OLD_SITE = 'https://www.steedos.cn';

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') (cell += '"'), i++;
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') row.push(cell), (cell = '');
    else if (c === '\n') row.push(cell), rows.push(row), (row = []), (cell = '');
    else cell += c;
  }
  const [head, ...body] = rows;
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ''])));
}

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const seo = (html) => ({
  title: decode(html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? ''),
  description: decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ''),
});

// Where the old site's redirect ended up: follow its rules, then normalize the
// old origin away so "https://www.steedos.cn/x" and "/x" compare equal.
const normalize = (url) => {
  const u = url.startsWith(OLD_SITE) ? url.slice(OLD_SITE.length) || '/' : url;
  return u.length > 1 && u.startsWith('/') ? u.replace(/\/$/, '') : u;
};

function staticFile(urlPath) {
  const decoded = decodeURIComponent(urlPath);
  const candidates = decoded === '/' ? ['index.html'] : [`${decoded.slice(1)}.html`, `${decoded.slice(1)}/index.html`, decoded.slice(1)];
  return candidates.map((c) => path.join(DIST, c)).find((f) => fs.existsSync(f) && fs.statSync(f).isFile());
}

async function checkStatic(row) {
  const redirect = resolveRedirect(row.url);
  if (redirect) return { kind: 'redirect', target: redirect };
  const file = staticFile(row.url);
  return file ? { kind: 'page', ...seo(fs.readFileSync(file, 'utf8')) } : { kind: 'missing' };
}

async function checkHttp(row) {
  const encoded = row.url.split('/').map((s) => encodeURIComponent(decodeURIComponent(s))).join('/');
  let url = BASE + encoded;
  for (let hops = 0; hops < 5; hops++) {
    const res = await fetch(url, { redirect: 'manual' });
    if (res.status >= 300 && res.status < 400) {
      const loc = new URL(res.headers.get('location'), url).toString();
      if (!loc.startsWith(BASE)) return { kind: 'redirect', target: loc };
      url = loc;
      continue;
    }
    if (res.status !== 200) return { kind: 'missing', status: res.status };
    const html = await res.text();
    return hops === 0 ? { kind: 'page', ...seo(html) } : { kind: 'redirect', target: url.slice(BASE.length) };
  }
  return { kind: 'missing', status: 'loop' };
}

const rows = parseCsv(fs.readFileSync(path.join(ROOT, 'cms-export', 'urls.csv'), 'utf8'));
const check = BASE ? checkHttp : checkStatic;
const failures = [];
const seoDiffs = [];
let ok = 0;

for (const row of rows) {
  const live = String(row.live_status);
  if (live !== '200' && !live.startsWith('3')) continue; // old 404s (e.g. typo'd nav links) need not exist
  const got = await check(row);
  if (live === '200') {
    if (got.kind !== 'page') {
      failures.push(`${row.url}: old site served a page, new site ${got.kind === 'redirect' ? `redirects to ${got.target}` : `has none${got.status ? ` (${got.status})` : ''}`}`);
      continue;
    }
    ok++;
    if (row.live_title && got.title !== row.live_title) seoDiffs.push(`${row.url}\n    title: ${row.live_title}\n       -> ${got.title}`);
    if (row.live_description && got.description !== row.live_description)
      seoDiffs.push(`${row.url}\n    description changed`);
  } else {
    const expected = normalize(resolveRedirect(row.url) ?? row.live_location);
    const actual = got.kind === 'redirect' ? normalize(got.target) : null;
    // Old redirect targets that were themselves redirects get flattened, so
    // compare against where the chain ends.
    const oldFinal = normalize(row.live_location);
    if (actual && (actual === expected || actual === normalize(resolveRedirect(oldFinal) ?? oldFinal))) ok++;
    else failures.push(`${row.url}: old site redirected to ${row.live_location}, new site ${actual ? `redirects to ${actual}` : 'does not redirect'}`);
  }
}

console.log(`Checked ${ok + failures.length} URLs against ${BASE ?? 'dist/'}: ${ok} ok, ${failures.length} failed.`);
if (seoDiffs.length) console.log(`\nTitle/description changes (${seoDiffs.length}):\n  ${seoDiffs.join('\n  ')}`);
if (failures.length) {
  console.log(`\nFailures:\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
