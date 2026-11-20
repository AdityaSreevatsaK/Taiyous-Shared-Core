import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

// Validate built static output, not a hypothetical deployed response.
const dist = new URL('../apps/hub/dist/', import.meta.url);
const [index, headers, assets] = await Promise.all([
  readFile(new URL('index.html', dist), 'utf8'),
  readFile(new URL('_headers', dist), 'utf8'),
  readdir(new URL('assets/', dist)),
]);
assert.equal(headers.split(/\r?\n/, 1)[0], '/*', 'Headers must apply to all static routes');
for (const header of [
  'Content-Security-Policy:', 'Referrer-Policy: no-referrer',
  'X-Content-Type-Options: nosniff', 'X-Frame-Options: DENY',
  'Permissions-Policy:', 'Cross-Origin-Resource-Policy: same-origin',
]) {
  assert.ok(headers.includes('  ' + header), 'Missing response header: ' + header);
}
const csp = headers.split('\n').find(line => line.startsWith('  Content-Security-Policy: '));
assert.ok(csp, 'Missing CSP');
for (const directive of [
  "default-src 'none'", "script-src 'self'", "style-src 'self'",
  "connect-src 'none'", "object-src 'none'", "frame-ancestors 'none'",
  "form-action 'none'", "base-uri 'none'",
]) {
  assert.ok(csp.includes(directive), 'Missing strict CSP directive: ' + directive);
}
assert.ok(assets.some(name => name.endsWith('.js')), 'No bundled JavaScript');
assert.match(index, /\/assets\/[^"'\s]+\.js/, 'HTML must reference bundled local JS');
assert.doesNotMatch(index, /<script\b(?![^>]*\bsrc=)/i, 'Inline script would violate CSP');
// In GitHub Actions and Cloudflare Pages the build must identify its exact source SHA.
const sha = process.env.CF_PAGES_COMMIT_SHA || process.env.GITHUB_SHA;
if (sha) {
  assert.match(sha, /^[0-9a-f]{40}$/i, 'Invalid deployment SHA in build environment');
  const revision = JSON.parse(await readFile(new URL('release.json', dist), 'utf8'));
  assert.deepEqual(revision, { commit: sha.toLowerCase() }, 'Built release manifest must identify this exact commit');
}
assert.ok(headers.replaceAll('\r\n', '\n').includes('/release.json\n  Cache-Control: no-store'), 'Deployment marker must not be cached');
console.log('Verified built Hub assets, deployment revision and static security header policy.');

const expectedApprovedAssets = {
  'branding/logos/logo-dark.png': '7876d5730d0622033d299f00b8ecd3c5d394f23c7d67c27538f247580bc7a2f6',
  'branding/logos/logo-light.png': 'a8949f311d18f6f13567889ba0d3e3f8f398b75177fe306f08e7ceb9bcdd825b',
  'branding/favicons/favicon-dark.ico': '094c20ba7b69b9348d0afde23fd7c6e2838ea9f76fb6b84970d84d2532b1ffd4',
  'branding/favicons/favicon-light.ico': '4138240f036def106e9551ecf7301c399bc8318bc59301ffe990b3a42472c56b',
};
for (const [path, expectedSha] of Object.entries(expectedApprovedAssets)) {
  const bytes = await readFile(new URL(path, dist));
  const actualSha = createHash('sha256').update(bytes).digest('hex');
  assert.equal(actualSha, expectedSha, `Approved original brand asset differs: ${path}`);
}
console.log('Verified exact approved raster logos and favicon originals.');
