import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://ngobrolglobal.com',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
