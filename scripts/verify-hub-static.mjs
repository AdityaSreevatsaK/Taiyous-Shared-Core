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


for (const asset of ['branding/hub-sun.svg','branding/hub-sun-logo.svg','branding/header-sakura.svg']) {
  const svg=await readFile(new URL(asset,dist),'utf8');
  assert.match(svg,/<svg\b/, 'Missing original local SVG artwork: '+asset);
  assert.doesNotMatch(svg,/<script\b/i, 'Decorative SVG must not contain scripts: '+asset);
}
console.log('Verified vector sunrise logo, favicon and header blossoms.');


// Exact SHA-256 hashes tie the visible cards to the approved detailed artwork,
// preventing a simplified replacement from accidentally reaching production.
const detailedArtworkHashes = {
  'novels-art.webp': '2f426b4cd1203d69b64b4f991e1b60d6693d46928e3d18270dd24684c06aec11',
  'manga-art.webp': '8a41a4b7826642376b9ce50561c44d5ec2a9fb547a9093275b6f006dd79d46e3',
  'anime-art.webp': '53e2145d9c2dff1e6f1cc07eda1ca5e550c1db87cb13a2c99a45e13178196e1e',
  'movies-tv-art.webp': 'ed165c245817afee91d8eb5653a9ae07cdd5251db75d345ddd97cf7392f6d90b',
};
for (const [filename, expectedHash] of Object.entries(detailedArtworkHashes)) {
  const bytes = await readFile(new URL('art/' + filename, dist));
  assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF', 'Expected a WebP RIFF image: ' + filename);
  assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP', 'Expected a WebP image: ' + filename);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), expectedHash,
    'Incorrect original detailed Hub artwork: ' + filename);
}
console.log('Verified the four exact high-resolution original media artworks.');


const cinematicArtworkHashes = {
  'hero-grand-library.webp': '414db23991bbb82787c2c4fc8365044bc5f0584b40e96c76966d6df694cce8c6',
  'reference-novel.webp': '3c515a691352ff0c50cef254d85e44c431ce4a1805fe349d6cce9f46e2cb220d',
  'reference-manga.webp': '428da12ed7e9aa1d3b72e22f339ecadfa8918b2cabb224d4b332fba784f17f5f',
  'reference-anime.webp': 'cf30325c6347c946dee6053844dec0d272512ea0380a62dca2b613108afe6772',
  'reference-movies-tv.webp': 'ba5f57a87b74fad385e8d5922f6a8ebd7b5d0667f0705b4a4de0c2f1dbfc3218',
};
for (const [filename, expected] of Object.entries(cinematicArtworkHashes)) {
  const bytes = await readFile(new URL('art/' + filename, dist));
  assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF');
  assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP');
  assert.equal(createHash('sha256').update(bytes).digest('hex'), expected,
    'Modified reference cinematic artwork: ' + filename);
}
assert.ok(index.includes('hero-clean.webp'), 'Preload the repaired cinematic environment');
console.log('Verified independently composited original cinematic environment and portal image assets.');

// Reference-guided reconstructions are individually packaged, byte-verified WebP assets.
// Original production and prototype artwork above is deliberately kept intact for rollback.
const highDensityHashes = {
  'cinematic-novel-1600.webp': '54d1645bf80c634d9d8e419c39854699bb4effb783ce8b1700b7a67b07513d56',
  'cinematic-novel-900.webp': '37b61fd8dda713d5198b82ccb338dca334567401a0983f25b4e5383c5c33b9fd',
  'cinematic-manga-1600.webp': '0b11355d178583531ac4e78fe471cc71c0e21a3300dd4c2c42d27732fbafc003',
  'cinematic-manga-900.webp': '43b1f439492015793959261f3da10c028781d918c697859a50de1c079efc320f',
  'cinematic-anime-1600.webp': 'afdf911cafeffb129d07ee4c0c1e174c68bab1ac919c6614a996e157c7a11bdd',
  'cinematic-anime-900.webp': 'b46b3b952cba4ee7380219a375c8980cb62692f484a8e8295477ee3c30bd0fba',
  'cinematic-movies-tv-1600.webp': '4978b75b0a7795fe05f0cdcf1746b8b27145d298fb06cacae80c71601dfec9e1',
  'cinematic-movies-tv-900.webp': '6e08c2481693511a71a85d4985f03d6cfeeca01a6a9c908ece0b62a60370a402',
  'hero-clean.webp': '288431f734ec8be1054e5f5f1dd4d0fb92e13b08b30b43aa7c8216b316c1a7e9',
};
for (const [name, digest] of Object.entries(highDensityHashes)) {
  const bytes = await readFile(new URL('art/' + name, dist));
  assert.equal(bytes.subarray(0, 4).toString('ascii'), 'RIFF', 'Expected WebP RIFF header: ' + name);
  assert.equal(bytes.subarray(8, 12).toString('ascii'), 'WEBP', 'Expected WebP encoding: ' + name);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), digest, 'Unexpected restored media bytes: ' + name);
}
console.log('Verified four responsive high-density cinematic artwork pairs and repaired background.');
