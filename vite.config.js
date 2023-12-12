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
        //additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
});
