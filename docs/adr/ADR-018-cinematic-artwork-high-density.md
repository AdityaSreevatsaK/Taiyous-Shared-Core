# ADR-018: High-density cinematic portal artwork and architectural backdrop repair

- **Date:** 24 November 2026
- **Status:** Draft PR #25, not production-approved
- **Scope:** Shared Core Hub artwork, semantic React markup, responsive CSS, quality checks only

## Why

The visual fidelity of the four cinematic destination panels suffered from image-resolution limitations. The current reference-derived WebPs contain only 536×355 (Novel), 546×354 (Manga), 554×339 (Anime) and 602×349 (Movies & TV) pixels. At 1648×928, the page displays these assets at approximately 535–577 CSS pixels wide; a DPR=2 display needs roughly 1070–1154 source pixels. Additional perceived softness came from strong bottom scrims and CSS gold glows. The architectural crop also retained pieces of its former composited panels at the right edge, causing visible duplicate/ghost panels.

## Asset decision and fidelity limits

The original generated one-page target and low-resolution inpainted WebP crops were inspected. The repository does not contain high-resolution, clean per-portal originals of these exact scenes. The previously generated four **reference-guided images** from the owner's earlier high-resolution image task are therefore adopted after comparison against the original source crops. This is not pixel-preserving super-resolution: regenerated details can differ, particularly manga hair, page glyphs and anime clothing. The four central subjects, directions, camera framing, lighting and compositions remain closely aligned. The previous low-resolution files remain intact for audit/rollback.

The high-resolution masters are the four actual generated RGB PNGs: 1586×992 (Novel, Manga, Anime) and 1683×935 (Movies & TV), retained separately in the deliverable master archive. Source master files do **not** include UI text, captions or panel edges. The deployed Hub uses optimised high-quality WebP derivatives: original-size `*-1600.webp` at quality 93 and 900-pixel-wide responsive variants at quality 89. No artificial edge sharpening, hallucinated detail, extra texture or new filters were added during encoding.

| Destination | Earlier displayed-source asset | New full-size master | Optimised delivery strategy |
| --- | --- | --- | --- |
| Novel | `reference-novel.webp` 536×355 | 1586×992 PNG | WebP 900w / 1586w |
| Manga | `reference-manga.webp` 546×354 | 1586×992 PNG | WebP 900w / 1586w |
| Anime | `reference-anime.webp` 554×339 | 1586×992 PNG | WebP 900w / 1586w |
| Movies & TV | `reference-movies-tv.webp` 602×349 | 1683×935 PNG | WebP 900w / 1683w |

The image `srcset` and `sizes` allow 1× browsers to choose smaller assets and 2× desktop browsers to select detailed masters. Existing SVG clip masks, native HTML headings, buttons and HTTPS navigation remain independent of the artwork. Object positioning is adjusted only to keep the manga face and projector in their original panel locations; the frame geometry remains unchanged. Overly strong scrims and rim bloom are reduced for clearer artwork while retaining accessible text.

## Architectural background correction

`hero-clean.webp` is a faithful re-export of the original left-side architectural photograph with a feathered transparent right edge along the previously included panel fragments. It prevents fragments of the old overlay panels from appearing behind the new live panels, without replacing the architectural image.

## Verification and release gates

- The static build integrity check verifies all nine new media files and preserves the hashes of the historical artwork.
- Unit tests verify real React artwork references and responsive asset `srcset`; browser tests verify 1648×928 screenshot capture, desktop DPR=2 image selection, keyboard navigation, theme persistence and non-clickable planned modules.
- The actual PR's Chromium, Firefox and WebKit visual evidence must be checked alongside the generated offline matching-layout preview and the original reference.
- Manual browser/device checks at 100% and 200% zoom, especially Safari and a physical high-DPI display, remain release-acceptance work, not automatically satisfied by CI.
- This work is not authorisation to merge, publish shared packages or change readers. Keep production `master` unchanged until visual owner approval.