/// <reference types='vitest' />
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { defineConfig, type Plugin } from 'vite';
import { reactRouter } from '@react-router/dev/vite';

const languages = ['en', 'ru'] as const;

const createDashboardResources = async (
  language: (typeof languages)[number],
) => {
  const commonPath = resolve(
    import.meta.dirname,
    `../../libs/shared/i18n/locales/${language}/common.json`,
  );
  const common = JSON.parse(await readFile(commonPath, 'utf8'));

  return JSON.stringify({ common }, null, 2);
};

const dashboardI18nPlugin = (): Plugin => {
  return {
    name: 'dashboard-i18n-resources',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = new URL(request.url ?? '/', 'http://localhost')
          .pathname;
        const language = languages.find(
          (candidate) => pathname === `/locales/${candidate}.json`,
        );

        if (!language) {
          next();
          return;
        }

        try {
          response.setHeader('Content-Type', 'application/json; charset=utf-8');
          response.end(await createDashboardResources(language));
        } catch (error) {
          next(error);
        }
      });
    },
    async generateBundle(outputOptions) {
      if (outputOptions.dir?.endsWith('/server')) {
        return;
      }

      await Promise.all(
        languages.map(async (language) => {
          this.emitFile({
            type: 'asset',
            fileName: `locales/${language}.json`,
            source: await createDashboardResources(language),
          });
        }),
      );
    },
  };
};

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/dashboard',
  resolve: {
    alias: [
      {
        find: '@shared/i18n',
        replacement: resolve(
          import.meta.dirname,
          '../../libs/shared/i18n/index.ts',
        ),
      },
      {
        find: '@shared/utils',
        replacement: resolve(import.meta.dirname, '../../libs/shared/utils'),
      },
    ],
  },
  server: {
    port: 4203,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [dashboardI18nPlugin(), !process.env.VITEST && reactRouter()].filter(
    Boolean,
  ),
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    name: '@crypto-exchanger/dashboard',
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8' as const,
    },
  },
}));
