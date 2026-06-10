import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';

import { createWebI18n } from '@crypto-exchanger/web/i18n';
import { App } from './app';

export const render = async (url: string) => {
  const i18n = await createWebI18n();

  return renderToString(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <App router="static" url={url} />
      </I18nextProvider>
    </StrictMode>,
  );
};
