# CI and Build Validation, 18 November 2026

## Outcome and history
Earlier Actions runs failed before a runner executed a single step. They were **not** failed TypeScript tests. The owner subsequently changed **Shared Core** to a public GitHub repository, after which the runner successfully started. The specific former account-level scheduling cause was not independently confirmed.

## Real executed verification
1. [Run 44279776833, attempt 2](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44279776833) passed at `92ab67838f05a7a91b4511946ccb2df76aa51027`: Node 22 install, TypeScript, 20 unit tests, Vite production build.
2. [Temporary lockfile bootstrap](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44312830330) passed and the GitHub Actions bot committed the generated workspace `package-lock.json`. A clean `npm ci`, typecheck, unit tests and build passed on the runner. The temporary workflow was then removed.
3. [Run 44313286935](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44313286935) passed at `68e55bfa22510733bed208e9fedeeb7038deefe4`: Ubuntu and Windows locked-install/typecheck/20 unit tests/build, plus 7 Chromium keyboard/responsive smoke tests.
4. [Temporary accessibility dependency lockfile bootstrap](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/actions/runs/44314221124) passed, including clean install, typecheck, unit tests and build. The bot committed a refreshed lockfile for `@axe-core/playwright` on the Hub branch. The temporary workflow is removed in the next commit.
5. **The newer axe-core WCAG browser tests and npm production audit require their matching new CI run; never report them as passing from the older run.**

## Current scope
- Shared Core and Hub source public; `@taiyou/contracts@0.0.0` and `@taiyou/ui@0.0.0` remain experimental, not published or adopted by sibling apps.
- [RFC PR #3](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/3) merged at `c2fde47c1ad577c06540e40e1bf4175c6c8a77ae`, following a green workflow.
- [Hub PR #2](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/2) holds the accessible gateway and CI improvements, pending its final new checks.
- There is **no Hub deployment, login server, shared search or private catalogue** in this repository. Passing CI does not publish a website.
- [Former runner-blocker issue #4](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/issues/4) should be closed only once the final PR gate remains green, with the historical cause labelled unconfirmed.

## Untested/manual release gates
Manual screen-reader/200% zoom testing, Firefox and Safari, deployment CSP/frame/referrer response headers, domain-ownership review, production hostname/staging, independent-app resilience verification and actual visual acceptance remain outstanding. No cross-repository package adoption is approved.
