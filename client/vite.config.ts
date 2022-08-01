/// <reference types="vitest" />
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

export default defineConfig({
  test: {
    environment: 'jsdom',
    deps: {
      fallbackCJS: true,
    },
  },
  plugins: [
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    pluginRewriteAll(),
    vanillaExtractPlugin(),
    checker({
      typescript: true,
    }),
  ],
  define: {
    'import.meta.vitest': 'undefined',
  },
  resolve: {
    alias: [{ find: '@shared', replacement: path.join(__dirname, './src/shared') }],
  },
  server: {
    port: 3000,
  },
  envDir: '../',
});
