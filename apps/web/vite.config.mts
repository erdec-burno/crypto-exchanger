import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

const workspaceRoot = resolve(import.meta.dirname, '../..');
const fromRoot = (path: string) => resolve(workspaceRoot, path);

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/web',
  resolve: {
    alias: {
      '@shared/api-client': fromRoot('libs/shared/api-client/index.ts'),
      '@shared/config': fromRoot('libs/shared/config/index.ts'),
      '@shared/i18n/resources': fromRoot('libs/shared/i18n/resources.ts'),
      '@shared/i18n': fromRoot('libs/shared/i18n/index.ts'),
      '@shared/types': fromRoot('libs/shared/types/index.ts'),
      '@shared/ui': fromRoot('libs/shared/ui/index.ts'),
      '@shared/utils': fromRoot('libs/shared/utils/index.ts'),
      '@shared/validation': fromRoot('libs/shared/validation/index.ts'),
      '@crypto-exchanger/web/features/exchange': fromRoot('libs/web/features/exchange/index.ts'),
      '@crypto-exchanger/web/features/landing': fromRoot('libs/web/features/landing/index.ts'),
      '@crypto-exchanger/web/features/legal': fromRoot('libs/web/features/legal/index.ts'),
      '@crypto-exchanger/web/features/order-status': fromRoot('libs/web/features/order-status/index.ts'),
      '@crypto-exchanger/web/features/support': fromRoot('libs/web/features/support/index.ts'),
      '@crypto-exchanger/web/i18n': fromRoot('libs/web/i18n/index.ts'),
    },
  },
  plugins: [react()],
  server: { port: 4200, host: 'localhost' },
  preview: { port: 4300, host: 'localhost' },
  build: { outDir: './dist/client', emptyOutDir: true },
  test: {
    name: 'web',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
