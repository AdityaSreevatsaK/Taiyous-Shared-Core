# ADR-020: Shared-coordinate cinematic portal geometry

- **Date:** 26 November 2026
- **Status:** Implemented in PR #28 for review and release
- **Scope:** Shared Core Hub presentation layer only; no reader, dataset, authentication or deployment-configuration changes
- **Authoritative benchmark:** Owner-provided cinematic library screenshot, excluding the browser chrome, at 1648 × 928 pixels

## Why the previous implementation failed

The earlier Hub positioned each of the four HTML cards with independent CSS `left/top/width/height` percentages. Its image clipping paths lived in different local SVG `objectBoundingBox` coordinate systems and its border paths were written independently in `0 0 1000 700` SVG viewports. Those separately authored curves had overlapping painted regions and mismatched trajectories. Negative margins on tablet/mobile and border strokes clipped along with the image compounded the problem. Adjusting z-index, brightness or vignette could not repair the shapes.

## Shared desktop geometry

`apps/hub/src/portalGeometry.ts` now defines all four full-page SVG paths and their bounding rectangles in one **1648 × 928** source coordinate system. Novel and Manga use opposite offsets of the **same upper Bézier seam centreline**; Anime and Movies & TV use opposite offsets of the **same lower Bézier seam centreline**. These offsets create a positive, narrow channel rather than overlapping artwork. The same source path drives:

1. the region's desktop bounding rectangle (via `--portal-x/y/w/h` percentages),
2. its transformed `objectBoundingBox` SVG clip path, applied to the real hyperlink/article and image, and
3. a decorative SVG metallic path rendered in its exact bounding rectangle.

The rim is a non-interactive **sibling of the clipped hyperlink/article**, not a child of its clip. That keeps the entire delicate stroke visible, while the actual link's pointer hit area remains limited to its curved silhouette. Transparent portions of the positioning `li` cannot intercept the next portal because the parent has `pointer-events:none` and its clipped HTML child opts in. The glint and bronze layers follow the identical path, not independently guessed borders. No stacking-order workaround is needed.

### Approximate 1648 × 928 desktop targets

- Top silhouettes: 11–12% top margin, approximately 41% row height.
- Lower silhouettes: approximately 40% height, with approximately 1–2% **painted** inter-row gutter.
- Bottom architectural breathing room: approximately 6%.
- Library-to-portal transition: a curved, progressing edge near 33–40% of viewport width.
- Complementary right/left seams use an explicit positive local gap, not coincident overlapping boundaries.
- Reference image regions and character identities remain from the previous high-density source assets; no art regeneration was undertaken.

These values are the source geometry's design intent, not a claim that every arbitrary browser screenshot is pixel-identical. The geometry is percentage-scaled across desktop viewports, while headings and controls scale proportionally rather than being capped at 1700px. Tablet/mobile intentionally switch to dedicated locally normalised clip shapes and a non-overlapping grid with **no negative margins**.

## Evidence-based visual acceptance

The Playwright suite samples the **actual SVG Path2D fills** across upper and lower adjacent seams, checking zero shared painted pixels and a measured gutter greater than or equal to 7 reference pixels. It also checks focus/hover hit areas, desktop copy and CTA separation, mobile clipping and responsive reflow. Browser-captured screenshots are taken at 1280 × 720, 1440 × 900, 1648 × 928, 1920 × 1080, 2560 × 1440, plus 320/390px mobile. Tests check headline/CTA scaling at ultrawide desktop resolutions. Screenshot review is required in addition to green tests.

The actual Chromium screenshots were compared against both the **original reference** and the **previous production implementation**. Primary P0 differences corrected: overlapping Novel/Manga and Anime/Movies artwork/borders, mismatched card edges, negative grid margins, overly light/thick shared strokes, and fixed-size oversized-desktop editorial controls. The original source-derived architectural background is retained without premature fade, external image requests or a flattened UI screenshot.

## Residual visual and acceptance limits

The source reference is composited artwork, not four original native photographic sources. The rendered site uses separately clipped high-density WebPs and real interface controls, so subpixel texture, precise illustration perspective, header font rendering and the shape highlight's appearance cannot be guaranteed identical. Manual native Safari/touch, NVDA/VoiceOver, real-device 200% zoom, dashboard rollback and measured Core Web Vitals remain tracked by [issue #7](https://github.com/AdityaSreevatsaK/Taiyous-Shared-Core/issues/7); browser automation does not substitute for these.

## Rollback and release

Keep the previous architectural and portal assets for audit/rollback. Do not delete the stable art, activate planned media tiles, centralise authentication, publish private `@taiyou/*@0.0.0` workspaces or change other repositories. For any approved production release, require matching-head Node 22 Ubuntu/Windows quality, Chromium/Firefox/WebKit accessibility and screenshot evidence, plus successful **exact-commit live Cloudflare HTTPS/security smoke** after merge. Rollback is a focused revert followed by a verified release manifest and public response check.
