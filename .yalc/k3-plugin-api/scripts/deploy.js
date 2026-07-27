#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

// Minimal .env parser — no dependencies needed
function loadEnv(path = '.env') {
  try {
    for (const line of readFileSync(path, 'utf-8').split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
      if (!process.env[key]) process.env[key] = val;
    }
  } catch { /* .env is optional */ }
}

loadEnv();

const {
  API_TOKEN,
  PLUGIN_ID,
  BACKEND_URL = 'https://k3-api.objectcode.de',
  FEDERATION_NAME,
  FEDERATION_MODULE,
} = process.env;

if (!API_TOKEN) { console.error('Error: API_TOKEN missing in .env'); process.exit(1); }
if (!PLUGIN_ID) { console.error('Error: PLUGIN_ID missing in .env'); process.exit(1); }

function collectFiles(dir, base = dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...collectFiles(full, base));
    } else {
      results.push({ full, rel: relative(base, full) });
    }
  }
  return results;
}

const distPath = join(process.cwd(), 'dist');
let files;
try {
  files = collectFiles(distPath);
} catch {
  console.error('Error: dist/ not found. Run pnpm build first.');
  process.exit(1);
}

console.log(`Deploying ${files.length} files for plugin ${PLUGIN_ID}...`);

const form = new FormData();

for (const { full, rel } of files) {
  // PHP converts '.' in multipart field names to '_'. To avoid this and
  // collisions with Vite chunk names (which contain '__'), we base64url-encode
  // the full relative path as the field key.
  const key = 'f_' + Buffer.from(rel).toString('base64').replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
  const blob = new Blob([readFileSync(full)]);
  form.append(key, blob, rel.split('/').pop());
}

if (FEDERATION_NAME)   form.append('name',   FEDERATION_NAME);
if (FEDERATION_MODULE) form.append('module', FEDERATION_MODULE);

const url = `${BACKEND_URL}/api/v1.0/plugin/${PLUGIN_ID}/deploy`;
console.log(`POST ${url}`);

const res = await fetch(url, {
  method: 'POST',
  headers: { Authorization: `Bearer ${API_TOKEN}` },
  body: form,
});

if (!res.ok) {
  const text = await res.text();
  console.error(`Deploy failed (${res.status}): ${text}`);
  process.exit(1);
}

const result = await res.json();
console.log('');
console.log('✓ Deploy successful!');
console.log('  Version:', result.versionId);
console.log('  URL:    ', result.url);
