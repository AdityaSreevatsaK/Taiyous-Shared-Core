## Why?
Describe the exact consumer need, design proposal or defect.

## Scope
- [ ] Only Shared Core/hub changed; other repositories are unaffected
- [ ] Shared export is used by at least two real consumers OR is explicitly experimental
- [ ] Source-level and runtime dependency boundaries documented

## Quality
- [ ] npm install (until lockfile) and typecheck/test/build
- [ ] Public URL safety and keyboard/mobile tests if navigation changes
- [ ] Accessibility and CSS isolation verified for shared UI
- [ ] Bundle size and compatibility impact assessed

## Privacy/operations
- [ ] No tokens or user media in code/variables/logs
- [ ] No cross-origin SSO assumptions
- [ ] No unauthorised publishing/deployment
- [ ] Documented rollback, version pin and consumer update plan

## Docs
- [ ] AGENTS, data contracts, ADRs, roadmap and handovers adjusted as needed
