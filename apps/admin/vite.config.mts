import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const workspaceRoot = resolve(import.meta.dirname, '../..');
const fromRoot = (path: string) => resolve(workspaceRoot, path);

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/admin',
  resolve: {
    alias: {
      '@shared/api-client': fromRoot('libs/shared/api-client/index.ts'),
      '@shared/config': fromRoot('libs/shared/config/index.ts'),
      '@shared/types': fromRoot('libs/shared/types/index.ts'),
      '@shared/ui': fromRoot('libs/shared/ui/index.ts'),
      '@shared/utils': fromRoot('libs/shared/utils/index.ts'),
      '@shared/validation': fromRoot('libs/shared/validation/index.ts'),
      '@crypto-exchanger/admin/features/audit-log': fromRoot('libs/admin/features/audit-log/index.ts'),
      '@crypto-exchanger/admin/features/auth': fromRoot('libs/admin/features/auth/index.ts'),
      '@crypto-exchanger/admin/features/dashboard': fromRoot('libs/admin/features/dashboard/index.ts'),
      '@crypto-exchanger/admin/features/kyc': fromRoot('libs/admin/features/kyc/index.ts'),
      '@crypto-exchanger/admin/features/orders': fromRoot('libs/admin/features/orders/index.ts'),
      '@crypto-exchanger/admin/features/rates': fromRoot('libs/admin/features/rates/index.ts'),
      '@crypto-exchanger/admin/features/settings': fromRoot('libs/admin/features/settings/index.ts'),
      '@crypto-exchanger/admin/features/users': fromRoot('libs/admin/features/users/index.ts'),
    },
  },
  plugins: [react()],
  server: { port: 4201, host: 'localhost' },
  preview: { port: 4301, host: 'localhost' },
  build: { outDir: './dist', emptyOutDir: true },
  test: {
    name: 'admin',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
