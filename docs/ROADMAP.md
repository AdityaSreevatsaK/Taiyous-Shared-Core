# Shared Core and Personal Hub Roadmap

## Phase 0: foundation (implemented)
- [x] Five-repository architecture chosen.
- [x] Shared Core private npm workspace and navigation-only Hub scaffold.
- [x] Experimental identity/rating contracts and pure media card component.
- [x] Node 22 TypeScript/React/Vite build and initial tests.
- [x] Agent, architecture, security, integration, operations and decision documentation.
- [x] Merge real workspace `package-lock.json` and locked Ubuntu/Windows/Chromium CI through Hub PR #2 (master `62120926fca93d0f9be5b61d8d9c05d9bfda36fb`).
- [x] Confirm a real GitHub runner and green Node 22 CI (see validation status; first green master SHA `c2fde47c1ad577c06540e40e1bf4175c6c8a77ae`).
- [ ] Confirm GitHub description/topics manually.

## Phase 1: excellent parent hub
- [x] Implement six Hub-local persistent themes, original illustrations and four fixed-order media cards (PR #8).
- [ ] Owner completes manual visual approval and responsive screenshot review.
- [ ] Commit and integrate the final approved pair of transparent Sun logos and theme-matched favicons.
- [x] Run automated Chromium, Firefox and WebKit keyboard/responsive/axe WCAG A/AA tests and inspect representative screenshots (PR #5).
- [ ] Complete manual visual, 200% zoom and screen-reader acceptance before release.
- [x] Keep unavailable modules plainly planned; no dummy redirects.
- [ ] Independently recheck the Novel Library destination from the live Hub without copying its data.

## Phase 2: identify REAL reusable code
- [ ] Ask at least two owners of media apps for the same UI/API requirement.
- [ ] Write RFC, API and versioning/rollback proposal.
- [ ] Add semantic tokens and 1–2 stateless components, not a universal media framework.
- [ ] Add package consumer fixtures and contract compatibility tests.

## Phase 3: controlled hub deployment
- [x] Prepare static response security headers with built-output CI verification (no deployment).
- [ ] Approve verified HTTPS domain and privacy posture.
- [x] Connect Cloudflare Pages to the `master` branch (GitHub deployment check succeeds).
- [ ] Independently confirm the live HTTPS response, CSP, accessibility, routing and rollback readiness.
- [ ] Set optional module URLs only when each app is genuinely deployed.
- [ ] No shared private backend or SSO.

## Phase 4: optional advanced platform services
- [ ] Evaluate opt-in cross-library search and collections with a server-side authorisation threat model.
- [ ] Evaluate central identity only if repeated per-app logins justify the additional security/maintenance complexity.
- [ ] Split hub to a sixth repo only when release cycles or maintainership genuinely diverge.

## Explicit non-goals
Rewriting the working Novel Library, forcing universal chapter/episode progress, creating a mandatory microservice or proxying private media through the hub.
