# Recommended GitHub Repository Settings

**URL:** https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core  
**Proposed description:** Shared contracts, UI components and Personal Hub for Taiyou's novels, manga, anime, movies and TV libraries.  
**Topics:** personal-hub, shared-ui, typescript, react, monorepo, media-library, design-system.  
**Visibility:** Public (changed by owner on 18 November 2026).  
**Default branch:** master (already configured).  
**Website:** the Hub is live and independently verified at https://taiyous-shared-core.pages.dev/; this is the appropriate repository website value if applying metadata.

These metadata values are defined here for manual application because current connected GitHub actions do not update repo description/topics/website directly.

Protections: least-privilege Actions token, review PRs, require green quality checks, disallow force pushes/deleting master and preserve security/dependency scanning. Use the committed Node 22 npm workspace lockfile with `npm ci` in CI. Cloudflare Pages Git integration is already authorised for the Hub's `master` branch. Do not configure additional automatic deploys, release tags, package publishing, or new hosting/privacy changes without separate owner approval.
