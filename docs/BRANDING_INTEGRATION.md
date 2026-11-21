# Archived proposal: alternate raster Sun logo and favicons

**Status: ARCHIVED, superseded, NOT a pending implementation task.** The current Hub deliberately ships the owner-approved `hub-sun-logo.svg` and `hub-sun.svg` from PRs #17/#18. The original raster ZIP was considered in closed-unmerged PR #12, then superseded for this Hub. Preserve the details below solely as historical alternatives; never imply the current mark is temporary.

## Historical proposed raster asset paths (not required)
Copy these **exact bytes** from `Taiyou_Final_Logos_Ready_For_Webapp.zip`:

| Source in ZIP | Destination in this repository | SHA-256 |
| --- | --- | --- |
| `logos/logo-dark.png` | `apps/hub/public/branding/logos/logo-dark.png` | `7876d5730d0622033d299f00b8ecd3c5d394f23c7d67c27538f247580bc7a2f6` |
| `logos/logo-light.png` | `apps/hub/public/branding/logos/logo-light.png` | `a8949f311d18f6f13567889ba0d3e3f8f398b75177fe306f08e7ceb9bcdd825b` |
| `favicons/favicon-dark.ico` | `apps/hub/public/branding/favicons/favicon-dark.ico` | `094c20ba7b69b9348d0afde23fd7c6e2838ea9f76fb6b84970d84d2532b1ffd4` |
| `favicons/favicon-light.ico` | `apps/hub/public/branding/favicons/favicon-light.ico` | `4138240f036def106e9551ecf7301c399bc8318bc59301ffe990b3a42472c56b` |

Both primary PNGs are transparent 1024×1024 images. Do not replace them with rasterised SVG guesses, previous assets, flat icons, a fake vector master or re-generated imitations.

## Historical unmerged implementation proposal (do not execute without a new request)
1. Replace `☼` in `apps/hub/src/App.tsx` for the header (and any hero symbol retained) with the correct transparent PNG, using `width`/`height`, `object-fit: contain` and appropriate alt/accessible-link naming. Keep the brand as a real Home link.
2. For **Midnight, Charcoal and Plum**, use the dark Antique Gold PNG and dark favicon. For **Sepia, Paper and Ocean**, use the light Sapphire/Antique Gold pair. Match the Hub's selected theme, never just OS light/dark.
3. Maintain the external pre-React theme bootstrap and strict CSP. Set the initial favicon from the stored preference **before React** and update it on theme changes. Add or update `rel="icon"` in `apps/hub/index.html`. No invalid early asset requests or custom inline scripts.
4. Add unit/browser regressions for correct image/favicons on all six themes, local preference persistence, keyboard focus, initial no-flash behaviour and error-free static loading.
5. Validate assets in `apps/hub/dist/branding/` after build, test 320/390/768/1280 widths and review the actual Cloudflare deployment status and live HTTP responses. Do not add PWA/service-worker functionality solely for icons.
6. Only after a PR with the real assets and verified checks is merged may docs describe the final branding as integrated.

No private catalogue, Hugging Face access or independent media repo change is required.


## Supersession notice, 21 November 2026

**This entire raster-logo integration contract is archival and must not be treated as a pending requirement.** The owner later approved an original, distinct **Hub-specific SVG sunrise logo** and favicon; PR [#17](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/17) and [#18](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/18) implemented and refined it. The asset-blocked raster [PR #12](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/pull/12) was **closed without merging**. The active logo is `apps/hub/public/branding/hub-sun-logo.svg`, with `hub-sun.svg` favicon. This decision does not alter the Sun logos used by the independent Novel/Manga readers. Reopen this raster alternative only on a **new explicit design request**.


## New shared Sun mark direction (21 November 2026)

The owner explicitly approved using the same Sun mark already present in the Novel and Manga applications to standardise the Hub branding. This is a new request and is **not** the old raster-logo ZIP/PR #12 proposal above.

The exact shared WebP files have been copied byte-for-byte into documentation references:

| Asset | Reference copy | Source Git blob SHA-1 (byte-identical) |
| --- | --- | --- |
| Light mark | `docs/assets/sun-light.webp` | `d292f5b3f8306925b93f1db4b7bee77324072a01` |
| Dark mark | `docs/assets/sun-dark.webp` | `565156eb5da784cdf1c4117a5d300b05dae71d35` |

The source copies are `Taiyous-Personal-Library/public/branding/sun-light.webp` and `sun-dark.webp`; the Manga repository uses the same exact bytes. Source components are `src/components/BrandMark.tsx` in Novel and `src/components/MangaBrandMark.tsx` in Manga. No sibling repository was changed.

**Current implementation truth:** the Hub still renders `apps/hub/public/branding/hub-sun-logo.svg` and uses `hub-sun.svg` as its favicon. The shared WebPs under `docs/assets/` are reference-only and are not shipped in the Hub. A future redesign PR should switch the Hub header to the exact shared mark, test the light/dark variants against all six Hub themes, and decide deliberately whether the favicon should be adapted or remain the existing SVG. Do not mistake the old raster logo ZIP for these approved shared assets.
