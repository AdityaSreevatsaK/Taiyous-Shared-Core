# Live Cloudflare deployment smoke check

`.github/workflows/live-hub.yml` runs on each merged `master` push and can also be started manually. It uses a **separate GitHub-hosted runner** to fetch `https://taiyous-shared-core.pages.dev/`, expecting HTTP 200, the React mount, the deployed six-theme bootstrap and all required security response headers. It retries transient failures for up to eight attempts while Cloudflare Pages finishes publishing.

This check requires no credentials, does not read private catalogue data or cross-origin library contents, and does not alter an active deployment. It is independent from the build and Cloudflare's own deployment status. It cannot prove visual correctness, manual screen-reader compatibility, an exact deployed commit SHA or access policy for every viewer. Review Cloudflare's reported commit and manual responsive screenshots separately.

If it fails, read the `Verify live Cloudflare Hub` Actions logs for the actual HTTP status or missing header. Compare Cloudflare `_headers`, Pages project build settings and any access rules before reverting or changing production configuration. Never disable this check solely to hide a genuine deployment failure.
