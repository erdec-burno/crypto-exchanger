import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import { join } from 'node:path';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    join(
      import.meta.dirname,
      '{src,pages,components,app}/**/!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(import.meta.dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
