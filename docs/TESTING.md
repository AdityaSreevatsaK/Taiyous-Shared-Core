# Cross-Repo Quality and Verification Matrix

## Tests committed
- Contract unit tests cover namespaced identifiers, illegal segments and rating bounds.
- Hub registry unit tests cover four keys, the verified Novel Library fallback, planned states, optional valid HTTPS links, and unsafe URL rejection (credentials, non-HTTPS, local hosts, tokens in queries/fragments).
- React server-rendered markup tests cover the four cards, skip link, one live destination and three non-clickable planned cards.
- Browser test sources in `apps/hub/tests/navigation.spec.ts` cover Chromium keyboard focus, status/link safety, reduced-motion smoke and no horizontal overflow at 320/390/768/1280 px.

## How to validate with Node 22+
1. `npm install --no-audit --no-fund`, then commit its generated `package-lock.json`.
2. `npm run typecheck`
3. `npm test`
4. `npm run build`
5. `npx playwright install chromium`
6. `npm run test:browser`

Browser tests start a local Vite server and explicitly clear unverified destination environment variables. They do not visit the Novel Library or any private data store.

## Execution status
As of the scaffold audit on 18 November 2026, the GitHub Actions runner could not execute a job and no step logs existed. Local validation must not be marked passing unless dependencies were successfully installed and commands completed. The agent working on this PR should append precise results to the PR description and update the validation record when actual evidence exists. The browser suite is not yet a green CI gate.

## Still required before a public hub release
- Real browser/screen-reader review, zoom to 200%, contrast checks in current Chromium/Firefox/Safari.
- External destination ownership and HTTPS deployment checks.
- CSP, X-Frame-Options/frame-ancestors, Referrer-Policy and caching headers on the actual production origin.
- Package consumer fixture and bundle-size comparison before shared component distribution.
- Private-data and auth boundary review for any later integration.
- Owner-approved staging, release and rollback.

The Hub must remain optional: each media app functions even if the Hub is unavailable.
