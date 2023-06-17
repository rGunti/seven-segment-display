import { defineConfig } from 'vite';

export default defineConfig({
  base: '',
  css: {
    preprocessorOptions: {
      scss: {
        //additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
});
