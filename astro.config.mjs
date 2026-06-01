import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL ?? 'https://personal-site-bench.vercel.app';

export default defineConfig({
  site,
  output: 'static',
  integrations: [mdx()],
  redirects: {
    '/': '/en/',
  },
  trailingSlash: 'always',
});
