// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://thanhdatnguyentk.github.io',
  base: '/thanhdatnguyentk',
  integrations: [react()],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 750,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/three/')) {
              return 'vendor-three';
            }
            if (
              id.includes('node_modules/@react-three/') ||
              id.includes('node_modules/three-stdlib/')
            ) {
              return 'vendor-r3f';
            }
          },
        },
      },
    },
  },
});