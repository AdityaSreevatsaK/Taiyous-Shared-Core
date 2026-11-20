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
  'novels.avif': 'fffe541816cb11d83f2f5c7f68bc54bc5013b91870a5b6c2b75f769ab6c157e7',
  'manga.avif': 'fa5880aa684abbca6bba733c7dce1cb7102653aee14e7309622c93bc7a1a7109',
  'anime.avif': 'ebdb631f4d4ca024d0f451dd5f5a3d2ed3d8d73f7c66893c27523c170bad64c8',
  'movies-tv.avif': '57c526634ed15ba5bf6484dffeeee2496c51b38d8132205da500117a04ea8649',
};
for (const [filename, expected] of Object.entries(illustrationHashes)) {
  const bytes = await readFile(new URL('art/' + filename, dist));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), expected,
    'Unexpected card artwork contents: ' + filename);
}
assert.match(await readFile(new URL('art/hub-landscape.svg', dist), 'utf8'), /<svg/, 'Missing local landscape');
console.log('Verified four approved card illustrations and self-hosted hero artwork.');
