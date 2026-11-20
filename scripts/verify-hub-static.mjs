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

const { createHash } = await import('node:crypto');
const illustrationHashes = {
  'novels.avif': '10ec9db58439c6b43a829f50cbbef7184730a21b59b987bacf9b772a8c67613e',
  'manga.avif': '5ac1c476c530e9e7f08967e1a0ff9db5a29191f74e5e30e3c16a9f00ecbd5c4f',
  'anime.avif': '19ffe64f326fffbb3ca6569d2bfb0dc29045b5ea8147d40b765a7c204d2ba6b8',
  'movies-tv.avif': '9998599afe35b60d839efca75c239f52fd109988a9a747617deb406d2e2bd1e1',
};
for (const [filename, expected] of Object.entries(illustrationHashes)) {
  const bytes = await readFile(new URL('art/' + filename, dist));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), expected,
    'Unexpected card artwork contents: ' + filename);
}
assert.match(await readFile(new URL('art/hub-landscape.svg', dist), 'utf8'), /<svg/, 'Missing local landscape');
console.log('Verified four approved card illustrations and self-hosted hero artwork.');
