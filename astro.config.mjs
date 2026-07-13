// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://thanhdatnguyentk.github.io',
  base: '/thanhdatnguyentk',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    // Material Web Components use bare specifiers that Vite needs to resolve
    // when imported inside Astro `<script>` blocks.
    ssr: {
      noExternal: ['@material/web'],
    },
  },
});