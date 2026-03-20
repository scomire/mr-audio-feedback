// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { execSync } from 'child_process';

export default defineConfig({
  site: 'https://mraudiofeedback.com',
  integrations: [
    sitemap(),
    {
      name: 'pagefind',
      hooks: {
        'astro:build:done': () => {
          execSync('npx pagefind --site dist', { stdio: 'inherit' });
        },
      },
    },
  ],
});