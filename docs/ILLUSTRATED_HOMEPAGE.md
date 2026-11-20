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


## Reference-match refinement (follow-up release)
- Warm brown/gold fixed-header identity across all six themes; theme selection still changes the rest of the page and persists.
- A self-hosted, original code-defined sunrise-and-horizon SVG replaces the provisional glyph in the Hub header. A matching standalone SVG is also used as the favicon. This is explicitly a Hub-specific brand choice, not a modification of the logos used by the Novel or Manga apps.
- The existing verified high-resolution 1086 × 1448 card illustrations remain unchanged and linked as entire cards only for Novel and Manga.
- Desktop cards are deliberately smaller than before: the four-card row is constrained to roughly 78% of the window width and adjusted for viewport height, allowing more sakura and mountain scenery to remain visible. The illustrated backdrop now continues behind the complete row and fades into the background.
- Validate single-screen composition at 1280×720, 1366×768, 1600×900, 1920×768 and 1920×1080. At 200% zoom or on tablets/phones, reflow vertically without horizontal overflow, rather than shrinking controls or clipping the cards.
- The previously discussed antique-gold raster branding PR #12 is optional and superseded **for the Hub only** by the owner's later approval to use a distinctive coded sunrise mark.


## Reference fidelity and coded sunrise logo (follow-up)
Compared the approved 1672 × 941 Sepia reference against a 1600 × 900 rendering, including an enlarged crop of the brand mark. The reference has a broad, solid golden half-sun, uneven curved rays, a dark hill shape and three overlapping water ribbons. The earlier Hub logo had an outlined sun circle and a small centre disk, which looked too thin and small.

This change redraws the sunrise as a **self-hosted transparent SVG**, also used in a dedicated dark-backed favicon. Its size and aspect ratio match the reference more closely. The three sakura blossoms in the masthead now use a local vector ornament instead of font glyphs. The header remains warm brown on all six themes.

The landscape is repositioned upward so that the tree canopy does not cover the whole left side and the sun/mountain horizon appears behind the first part of the card row. Hero copy is larger and slightly lower, while the four original 1086 × 1448 card illustrations are preserved unchanged.

The artwork is still independent CSS, HTML and local SVG/AVIF assets, **not a screenshot of the entire webpage**. Genuine keyboard access, persistent themes, four/two/one-column reflow and desktop 100%-zoom fit remain unchanged.


## Original detailed artwork release (21 November 2026)
The artwork-only layout remains, with four truly detailed illustrations from the
**original generated four-panel image approved by the owner**. The previous
simplified SVG replacements were a mistake and have been withdrawn.

| Card | Exact original artwork | Visible HTML title |
| --- | --- | --- |
| Novel | `novels-art.webp` | Novel Library |
| Manga | `manga-art.webp` | Manga Library |
| Anime | `anime-art.webp` | Anime Library |
| Movies & TV | `movies-tv-art.webp` | Movies & TV Library |

Each image is a cropped, high-quality WebP portrait exported from its matching
quarter of the approved original 2172 × 724 panorama. Final dimensions are
1086 × 1448 with the 3:4 aspect ratio preserved. Each retains the full
detailed scene without a headline, badge, action button or watermark inside it.

The HTML `h3` label appears centred **below** the image, outside its rounded
frame. The entire image and title are linked only for Novel and Manga. Planned
libraries remain non-interactive and announce their status to screen readers
through visually hidden text. No duplicate titles, subtitles or visible badges
are rendered.

The homepage composition, original sunrise SVG logo and favicon, sakura landscape,
six persistent themes and strict CSP remain unchanged. The responsive layout
stays four desktop columns, two tablet columns and one narrow-screen column.
Zoomed layouts reflow naturally. The former complete-card AVIF artwork remains
available for historical comparison and rollback.

The production static verification checks the precise SHA-256 digest of **each
original detailed WebP** to detect accidental artwork substitution. All assets
are local. No external images or tracking are loaded.
