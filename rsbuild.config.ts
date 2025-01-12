import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import path from 'path';

export default defineConfig({
  source: {
    entry: {
      index: './src/index.tsx'
    }
  },
  plugins: [pluginReact(), pluginSass()],
  tools: {
    rspack: (config, { env }) => {
      if (env === 'development') {
        config.devtool = 'cheap-module-source-map';
      }
      return config;
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  },
  dev: {
    progressBar: true,
    hmr: true
  }
});
