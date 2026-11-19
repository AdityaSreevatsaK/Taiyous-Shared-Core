# Integrating Taiyou's final approved Sun artwork

**Status:** Source ZIP supplied by owner, but the four approved binary files are not yet committed in the Shared Core GitHub repository. Do not mark the branding milestone complete merely because the current Hub uses a temporary sun glyph.

## Required public paths
Copy these **exact bytes** from `Taiyou_Final_Logos_Ready_For_Webapp.zip`:

| Source in ZIP | Destination in this repository | SHA-256 |
| --- | --- | --- |
| `logos/logo-dark.png` | `apps/hub/public/branding/logos/logo-dark.png` | `7876d5730d0622033d299f00b8ecd3c5d394f23c7d67c27538f247580bc7a2f6` |
| `logos/logo-light.png` | `apps/hub/public/branding/logos/logo-light.png` | `a8949f311d18f6f13567889ba0d3e3f8f398b75177fe306f08e7ceb9bcdd825b` |
| `favicons/favicon-dark.ico` | `apps/hub/public/branding/favicons/favicon-dark.ico` | `094c20ba7b69b9348d0afde23fd7c6e2838ea9f76fb6b84970d84d2532b1ffd4` |
| `favicons/favicon-light.ico` | `apps/hub/public/branding/favicons/favicon-light.ico` | `4138240f036def106e9551ecf7301c399bc8318bc59301ffe990b3a42472c56b` |

Both primary PNGs are transparent 1024×1024 images. Do not replace them with rasterised SVG guesses, previous assets, flat icons, a fake vector master or re-generated imitations.

## Implementation contract after the assets exist
1. Replace `☼` in `apps/hub/src/App.tsx` for the header (and any hero symbol retained) with the correct transparent PNG, using `width`/`height`, `object-fit: contain` and appropriate alt/accessible-link naming. Keep the brand as a real Home link.
2. For **Midnight, Charcoal and Plum**, use the dark Antique Gold PNG and dark favicon. For **Sepia, Paper and Ocean**, use the light Sapphire/Antique Gold pair. Match the Hub's selected theme, never just OS light/dark.
3. Maintain the external pre-React theme bootstrap and strict CSP. Set the initial favicon from the stored preference **before React** and update it on theme changes. Add or update `rel="icon"` in `apps/hub/index.html`. No invalid early asset requests or custom inline scripts.
4. Add unit/browser regressions for correct image/favicons on all six themes, local preference persistence, keyboard focus, initial no-flash behaviour and error-free static loading.
5. Validate assets in `apps/hub/dist/branding/` after build, test 320/390/768/1280 widths and review the actual Cloudflare deployment status and live HTTP responses. Do not add PWA/service-worker functionality solely for icons.
6. Only after a PR with the real assets and verified checks is merged may docs describe the final branding as integrated.

No private catalogue, Hugging Face access or independent media repo change is required.
