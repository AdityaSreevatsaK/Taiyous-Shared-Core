// This config executes in Node; Hub's TypeScript scope intentionally omits Node globals.
declare const process: { env: Record<string, string | undefined> };
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/** Emit only the public Git SHA so live verification cannot silently accept stale deployments. */
function publicDeployRevision(): Plugin {
  return {
    name: 'taiyou-public-deploy-revision',
    apply: 'build',
    generateBundle() {
      const commit = process.env.CF_PAGES_COMMIT_SHA || process.env.GITHUB_SHA;
      if (!commit) {
        if (process.env.CF_PAGES === '1') {
          throw new Error('Cloudflare Pages did not provide CF_PAGES_COMMIT_SHA');
        }
        return; // Local builds without CI metadata remain usable.
      }
      if (!/^[0-9a-f]{40}$/i.test(commit)) {
        throw new Error('Deployment commit metadata is not a valid SHA-1');
      }
      this.emitFile({
        type: 'asset',
        fileName: 'release.json',
        source: JSON.stringify({ commit: commit.toLowerCase() }) + '\n',
      });
    },
  };
}

export default defineConfig({ plugins: [react(), publicDeployRevision()] });
