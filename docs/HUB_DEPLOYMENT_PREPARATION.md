# Hub Deployment Preparation

**Status: deployed.** The Hub is served from `https://taiyous-shared-core.pages.dev/` through Cloudflare Pages, with independent live smoke and exact-commit checks. This document retains the original deployment preparation requirements as historical guidance. The Hub still has no user catalogue, secret, central authentication or shared database.

## Proposed Cloudflare Pages settings

| Setting | Proposed value |
| --- | --- |
| Repo / branch | `AdityaSreevatsaK/Taiyous-Shared-Core` / `master` |
| Root directory | Repository root |
| Build runtime | Node.js 22 |
| Build command | `npm ci --no-audit --no-fund && npm run build` |
| Output directory | `apps/hub/dist` |
| Framework | Static Vite |
| Secrets / database | None |

Novel and Manga Library HTTPS destinations are enabled by default after independent owner-controlled deployment verification. Do not configure Anime or Movies & TV links before those apps have verified deployments. All `VITE_*` values are public browser-bundle data; never store passwords, HF tokens, OAuth secrets or private media there.

## Static policy and verification

- `apps/hub/public/_headers` is included in the production Vite output for Cloudflare Pages. It limits CSP to local scripts, styles, images and fonts, blocks cross-origin fetches, embedding and form actions, and adds referrer, MIME, browser-permission and framing restrictions.
- `node scripts/verify-hub-static.mjs` checks the built output in CI. This does not prove the headers will be applied by a future host; test actual HTTP response headers after staging.
- The Hub does not load other library catalogues, copy cookies, proxy private media or provide SSO. A preview Pages URL may itself be publicly accessible even while personal media data remains private.

## Before any release

1. Obtain explicit owner approval for the staging hostname, access policy, public visibility and rollback.
2. Deploy a reviewed master SHA and inspect the response headers and CSP console errors on the actual staging origin. Verify the HTTPS Novel Library destination is owner-controlled.
3. Test 320/390/768/1280 widths, 200% browser zoom, touch, keyboard and focus, native Safari, and manual NVDA/VoiceOver. Obtain the owner's visual approval.
4. Check that the Hub remains functional if each media application is unavailable and does not issue private or third-party media requests.
5. Record staging URL, deployed SHA, HTTP headers, accessibility findings and rollback build. Obtain separate approval before production promotion.

Do not add automatic deployment, publish npm packages, change other repositories or provision shared authentication as part of this preparation.
