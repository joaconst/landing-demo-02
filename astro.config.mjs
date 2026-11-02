import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://umbral.demo',
  build: {
    inlineStylesheets: 'auto',
  },
  devToolbar: {
    enabled: false,
  },
});
