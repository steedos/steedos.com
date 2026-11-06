import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { hiddenPaths } from './src/lib/sitemap-exclude.mjs';

// URLs must stay exactly as they were on the old Next.js site: no trailing
// slash, and `/a/b` served from `a/b.html` (nginx: try_files $uri $uri.html).
export default defineConfig({
  site: 'https://www.steedos.cn',
  trailingSlash: 'never',
  build: { format: 'file' },
  server: { host: true },
  integrations: [
    sitemap({
      filter: (page) => !hiddenPaths.has(new URL(page).pathname),
    }),
  ],
});
