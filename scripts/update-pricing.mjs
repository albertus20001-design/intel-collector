import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const DEFAULT_TIMEOUT = 20;
const CURL_HEADERS = [
  '-A', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,text/markdown,text/plain;q=0.8,*/*;q=0.7',
  '-H', 'Accept-Language: en-US,en;q=0.9'
];
const GLOBAL_REJECT_PATTERNS = [
  'ERROR_FETCHING_URL',
  'Author Not Found',
  '<title>403: Forbidden</title>',
  '403: Forbidden',
  'Just a moment...',
  'Enable JavaScript and cookies to continue',
  'Attention Required! | Cloudflare',
  'cf-challenge',
  '__cf_chl_tk'
];

function runCurl(args, maxBuffer = 20 * 1024 * 1024) {
  return execFileSync('curl', args, {
    encoding: 'utf8',
    maxBuffer
  });
}

function tryFetch(url, timeoutSeconds = DEFAULT_TIMEOUT) {
  try {
    const body = runCurl(['-L', '--fail', '--silent', '--show-error', '--compressed', '--max-time', String(timeoutSeconds), ...CURL_HEADERS, url]);
    return { ok: true, body, url };
  } catch (error) {
    return { ok: false, error: String(error.stderr || error.message || error), url };
  }
}

function decodeEntities(s) {
  return s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

function cleanHtml(html) {
  let s = html;
  s = s.replace(/<script[\s\S]*?<\/script>/gi, '\n');
  s = s.replace(/<style[\s\S]*?<\/style>/gi, '\n');
  s = s.replace(/<noscript[\s\S]*?<\/noscript>/gi, '\n');
  s = s.replace(/<svg[\s\S]*?<\/svg>/gi, '\n');
  s = s.replace(/<!--([\s\S]*?)-->/g, '\n');
  s = s.replace(/<(h[1-6])[^>]*>/gi, '\n# ');
  s = s.replace(/<\/h[1-6]>/gi, '\n\n');
  s = s.replace(/<(p|div|section|article|main|header|footer|nav|aside|li|tr|td|th|ul|ol|table|thead|tbody|tfoot|blockquote|pre|code|br|span|button|details|summary)[^>]*>/gi, '\n');
  s = s.replace(/<[^>]+>/g, '');
  s = decodeEntities(s);
  s = s.replace(/^!.*$/gm, '');
  s = s.replace(/^\s*\!\[.*$/gm, '');
  s = s.replace(/\{[^\n]*\}/g, '');
  s = s.replace(/requestAnimationFrame\([^\n]*\)/g, '');
  s = s.replace(/window\.[A-Za-z0-9_]+[^\n]*/g, '');
  s = s.replace(/document\.[A-Za-z0-9_]+[^\n]*/g, '');
  s = s.replace(/[ \t]+\n/g, '\n');
  s = s.replace(/\n{3,}/g, '\n\n');
  return s.trim();
}

function shouldCleanHtml(body) {
  const t = body.trimStart();
  return /^<!doctype html>|^<html[\s>]/i.test(t) || /<html|<script|window\.dataLayer|__NEXT_DATA__|requestAnimationFrame|document\.documentElement/i.test(body);
}

function isRejectedContent(body, patterns = []) {
  const checks = [...GLOBAL_REJECT_PATTERNS, ...patterns];
  return checks.some((p) => body.includes(p));
}

function hasFailedSnapshot(file) {
  if (!existsSync(file)) return false;
  const body = readFileSync(file, 'utf8');
  return isRejectedContent(body);
}

function cleanupFailedSnapshot(file) {
  if (!hasFailedSnapshot(file)) return false;
  unlinkSync(file);
  return true;
}

function parseSourcesYaml(yml) {
  const lines = yml.split(/\r?\n/);
  const items = [];
  let vendor = null;
  let current = null;
  let inSources = false;
  for (const raw of lines) {
    const line = raw.trimEnd();
    let m = line.match(/^\s{2}([a-z0-9_-]+):\s*$/i);
    if (m) { vendor = m[1]; continue; }
    m = line.match(/^\s{4}sources:\s*$/);
    if (m) { inSources = true; continue; }
    m = line.match(/^\s{6}-\s+name:\s*(\S+)\s*$/);
    if (m && inSources) {
      current = { vendor, name: m[1], enabled: true, priority: 99, tags: [], rejectPatterns: [], fetchMode: 'markdown', timeoutSeconds: DEFAULT_TIMEOUT };
      items.push(current);
      continue;
    }
    if (!current) continue;
    m = line.match(/^\s{8}url:\s*(\S+)\s*$/); if (m) { current.url = m[1]; continue; }
    m = line.match(/^\s{8}enabled:\s*(true|false)\s*$/); if (m) { current.enabled = m[1] === 'true'; continue; }
    m = line.match(/^\s{8}priority:\s*(\d+)\s*$/); if (m) { current.priority = Number(m[1]); continue; }
    m = line.match(/^\s{8}fetchMode:\s*(\S+)\s*$/); if (m) { current.fetchMode = m[1]; continue; }
    m = line.match(/^\s{8}outputPath:\s*(\S+)\s*$/); if (m) { current.outputPath = m[1]; continue; }
    m = line.match(/^\s{8}timeoutSeconds:\s*(\d+)\s*$/); if (m) { current.timeoutSeconds = Number(m[1]); continue; }
    m = line.match(/^\s{8}tags:\s*\[(.*)\]\s*$/); if (m) { current.tags = m[1].split(',').map(s => s.trim()).filter(Boolean); continue; }
    m = line.match(/^\s{8}notes:\s*(.+)$/); if (m) { current.notes = m[1]; continue; }
    m = line.match(/^\s{8}rejectPatterns:\s*$/); if (m) { current.rejectPatterns = []; continue; }
    m = line.match(/^\s{10}-\s*(.+)\s*$/); if (m) { current.rejectPatterns.push(m[1]); continue; }
  }
  return items.filter((x) => x.vendor && x.name && x.url && x.enabled !== false).sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
}

function fetchSource(src) {
  const candidates = [];
  if (!src.url.endsWith('.md') && !src.url.endsWith('.txt')) candidates.push(`${src.url}.md`);
  candidates.push(src.url);

  for (const candidate of candidates) {
    const result = tryFetch(candidate, src.timeoutSeconds);
    if (!result.ok) continue;
    let body = result.body;
    if (shouldCleanHtml(body)) body = cleanHtml(body);
    if (isRejectedContent(body, src.rejectPatterns)) continue;
    return { ok: true, body, url: candidate };
  }

  return { ok: false };
}

const sources = parseSourcesYaml(readFileSync('sources/index.yml', 'utf8'));
for (const src of sources) {
  const file = src.outputPath || `data/${src.vendor}/${src.name}.md`;
  mkdirSync(dirname(file), { recursive: true });

  const result = fetchSource(src);
  if (!result.ok) {
    if (cleanupFailedSnapshot(file)) {
      console.log(`removed failed snapshot ${file}`);
    } else {
      console.log(`skipped ${file} (fetch failed or rejected, keeping existing snapshot)`);
    }
    continue;
  }

  writeFileSync(file, result.body.trimEnd() + '\n');
  console.log(`updated ${file}`);
}
