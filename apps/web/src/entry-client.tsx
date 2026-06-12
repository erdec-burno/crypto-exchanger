import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

import { createWebI18n } from '@crypto-exchanger/web/i18n';
import { App } from './app';

const i18n = await createWebI18n();

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </StrictMode>,
);
