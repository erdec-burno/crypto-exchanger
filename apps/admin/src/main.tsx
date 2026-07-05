import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';

import { createAdminI18n } from '@crypto-exchanger/admin/i18n';

import { App } from './app';

import './styles.css';

const i18n = await createAdminI18n();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </StrictMode>,
);
