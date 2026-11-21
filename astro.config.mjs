// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://girelab.dev',
  integrations: [sitemap()],
  // Préchargement des liens au survol : navigation quasi instantanée
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
