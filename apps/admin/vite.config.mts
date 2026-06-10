import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';

const workspaceRoot = resolve(import.meta.dirname, '../..');
const fromRoot = (path: string) => resolve(workspaceRoot, path);
const languages = ['en', 'ru'] as const;

const createAdminResources = async (language: (typeof languages)[number]) => {
  const files = {
    admin: fromRoot(`libs/admin/i18n/locales/${language}.json`),
    common: fromRoot(`libs/shared/i18n/locales/${language}/common.json`),
    validation: fromRoot(
      `libs/shared/i18n/locales/${language}/validation.json`,
    ),
  };
  const entries = await Promise.all(
    Object.entries(files).map(async ([namespace, path]) => {
      const resource = JSON.parse(await readFile(path, 'utf8'));

      return [namespace, resource];
    }),
  );

  return JSON.stringify(Object.fromEntries(entries), null, 2);
};

const adminI18nPlugin = (): Plugin => {
  return {
    name: 'admin-i18n-resources',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const language = languages.find(
          (candidate) => request.url === `/locales/${candidate}.json`,
        );

        if (!language) {
          next();
          return;
        }

        try {
          response.setHeader('Content-Type', 'application/json; charset=utf-8');
          response.end(await createAdminResources(language));
        } catch (error) {
          next(error);
        }
      });
    },
    async generateBundle() {
      await Promise.all(
        languages.map(async (language) => {
          this.emitFile({
            type: 'asset',
            fileName: `locales/${language}.json`,
            source: await createAdminResources(language),
          });
        }),
      );
    },
  };
};

export default defineConfig({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/admin',
  resolve: {
    alias: {
      '@shared/api-client': fromRoot('libs/shared/api-client/index.ts'),
      '@shared/config': fromRoot('libs/shared/config/index.ts'),
      '@shared/i18n': fromRoot('libs/shared/i18n/index.ts'),
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
      '@crypto-exchanger/admin/i18n': fromRoot('libs/admin/i18n/index.ts'),
    },
  },
  plugins: [adminI18nPlugin(), react()],
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
