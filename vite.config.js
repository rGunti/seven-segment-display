import { defineConfig } from 'vite';

export default defineConfig({
  base: '',
  build: {
    sourcemap: 'inline',
    rollupOptions: {
      input: {
        main: 'index.html',
        gps: 'gps.html',
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
        //additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
});
