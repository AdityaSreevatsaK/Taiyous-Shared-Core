# Taiyou illustrated homepage: sakura panorama and responsive cards (20 November 2026)

## Visual direction
The approved homepage uses a single illustrated sakura sunrise scene behind the welcome message and top of the card row, fading smoothly into the selected background colour. The sunrise, layered mountains and cherry blossom canopy remain consistent across all six themes; the footer has a subtle seigaiha wave motif.

The original images are complete illustrated tiles including title, status and action artwork. Only Novel and Manga are real whole-card links. Anime and Movies & TV are non-interactive, and the status remains true in visually hidden HTML for screen readers. Never create fake links to planned products.

## High-resolution assets
Cards were regenerated using the approved design language at **1086 × 1448 pixels each** and compressed at AVIF quality 65 with transparent corners. All are self-hosted and subject to SHA-256 build verification:

| Path under apps/hub/public/art | SHA-256 |
| --- | --- |
| novels.avif | 954608525c6478e3a70024db85a9cb265bb43c5428ddcaa5144dde9123d3c93f |
| manga.avif | adc208b8c9b4349ea8f238b6791fd60785fd99430ef9613fdcdd4bf6e70ab64f |
| anime.avif | 085fa725f5d0e4b6a4dc65e85002d4011c93bcee1de6e39ecd4f63e325f277f8 |
| movies-tv.avif | 06064325fadf3f566f8b528a885c2a7c90ea2339b029ca0fabef0cec7351262b |
| landscape.avif | 674811f513949bbc447cb095a847add286ea125438a3c6e5b04ad79301491854 |

The seigaiha pattern is an original tiny SVG at `apps/hub/public/art/waves.svg`. The previous small, heavily compressed four-card artwork has been replaced; the previous decorative SVG landscape remains in the source solely as a historical legacy resource, not a rendered dependency.

## Zoom and layout
- At normal desktop 100% zoom with 1280×720, 1366×768, 1600×900, 1920×768 and 1920×1080 viewports, the page is designed to fit the four complete cards and footer without vertical scrolling.
- CSS dynamically limits the four-column card row using both viewport width and available viewport height. This does **not** force a browser zoom level.
- Below 1100 CSS pixels the cards reflow to two columns, and below 620 pixels to one. At higher browser zoom, vertical scrolling is correct, while horizontal overflow must not occur.
- Layout tests check those cases and image naturalWidth at least 1000 pixels. The actual bitmap labels grow with the whole image; alternative headings, descriptions and statuses remain available to assistive technology.
- No moving petals, autoplay, third-party media requests, new libraries, cross-app auth or storage.

## Release verification
Run Node 22 typecheck, tests, build, built-asset digest verification, three-browser responsive/WCAG checks and live Cloudflare smoke checks after merge. Visual and manual screen-reader review remain distinct from automated tests. The exact owner-approved Sun branding remains in separate draft PR #12 until its asset bytes are transferred.
