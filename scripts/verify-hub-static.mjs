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
  'novels.avif': '954608525c6478e3a70024db85a9cb265bb43c5428ddcaa5144dde9123d3c93f',
  'manga.avif': 'adc208b8c9b4349ea8f238b6791fd60785fd99430ef9613fdcdd4bf6e70ab64f',
  'anime.avif': '085fa725f5d0e4b6a4dc65e85002d4011c93bcee1de6e39ecd4f63e325f277f8',
  'movies-tv.avif': '06064325fadf3f566f8b528a885c2a7c90ea2339b029ca0fabef0cec7351262b',
};
for (const [filename, expected] of Object.entries(illustrationHashes)) {
  const bytes = await readFile(new URL('art/' + filename, dist));
  assert.equal(createHash('sha256').update(bytes).digest('hex'), expected,
    'Unexpected card artwork contents: ' + filename);
}
const landscape = await readFile(new URL('art/landscape.avif', dist));
assert.equal(createHash('sha256').update(landscape).digest('hex'), '674811f513949bbc447cb095a847add286ea125438a3c6e5b04ad79301491854', 'Unexpected sakura landscape artwork');
assert.match(await readFile(new URL('art/waves.svg', dist), 'utf8'), /<svg/, 'Missing seigaiha decoration');
console.log('Verified four approved card illustrations and self-hosted hero artwork.');
