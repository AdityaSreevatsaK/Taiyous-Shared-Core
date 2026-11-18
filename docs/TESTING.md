# Cross-Repo Quality and Verification Matrix

## Implemented tests
- `packages/contracts/src/index.test.ts`: kind/provider ID namespacing, illegal segments and personal rating boundaries.
- `apps/hub/src/catalogue.test.ts`: module registry contains exactly four modules and configured links must be HTTPS.
- TypeScript strict checks for contracts, UI and hub; production build generates static hub assets.
- CI does NOT currently perform browser automation, dependency-lock verification or external deployment checks; do not claim otherwise.

## Tests to add before a hub release
1. Render four cards across 320px, 390px, 768px and 1440px; no overflow, correct focus order, readable contrast.
2. Verify configured external HTTPS links are correct, safe and open without unexpected token transfer.
3. Verify unconfigured tiles are NOT buttons/links and communicate 'Coming later'.
4. Keyboard/screen-reader label tests, reduced motion, zoom at 200%, colour contrast.
5. Offline hub load after controlled asset caching (if a PWA is later approved), with a documented non-cached fallback.
6. CSP/header tests on the actual Cloudflare Pages origin once deployed.
7. Contract package consumer fixture build and backwards-compatible API tests before publishing.
8. Regression test that four media apps do not require the hub's availability to start.

## Cross-app acceptance review
When Shared Core supplies UI/contracts to another repo, the consuming app runs its own tests independently. Screenshot/component diffs, performance/bundle-size measurements and fallback to prior pinned version must be documented.

## Release gate
Locked install, full build, unit and browser tests, verified domains, accessibility, privacy/security checks, owner-approved staging and rollback. A simple Vite build is insufficient.
