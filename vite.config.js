import { defineConfig } from 'vite';

export default defineConfig({
  base: '',
  build: {
    sourcemap: 'inline',
  },
  css: {
    preprocessorOptions: {
      scss: {
        //additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
});
