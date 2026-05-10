import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, 'src');
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      app: resolve(src, 'app'),
      entities: resolve(src, 'entities'),
      features: resolve(src, 'features'),
      shared: resolve(src, 'shared'),
      stores: resolve(src, 'stores'),
      widgets: resolve(src, 'widgets'),
    },
  },
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
});
