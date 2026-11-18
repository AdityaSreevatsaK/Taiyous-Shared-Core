# Recommended GitHub Repository Settings

**URL:** https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core  
**Proposed description:** Private shared contracts, UI components and Personal Hub for Taiyou's novels, manga, anime, movies and TV libraries.  
**Topics:** personal-hub, shared-ui, typescript, react, monorepo, media-library, design-system.  
**Visibility:** Private (already set).  
**Default branch:** master (already configured).  
**Website:** leave blank until the Hub has a verified deployment. Do not copy the Novel Library's URL as the Hub homepage.

These metadata values are defined here for manual application because current connected GitHub actions do not update repo description/topics/website directly.

Protections: least-privilege Actions token, review PRs, require green quality checks, disallow force pushes/deleting master and preserve security/dependency scanning. Do not enforce `npm ci` until a valid lockfile is generated and committed. No automatic deploy or release tags without owner consent.
