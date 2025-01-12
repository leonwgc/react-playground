import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      outDir: './build/dist/dist'
    },
    plugins: [react()],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src')
      }
    },
    server: {
      host: true,
      port: 1000
    },
    css: {
      preprocessorOptions: {
        sass: { api: 'modern' }
      }
    }
  };
});
