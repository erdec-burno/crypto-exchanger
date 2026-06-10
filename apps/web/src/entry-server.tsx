import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

import { App } from './app';

export const render = (url: string) => {
  return renderToString(
    <StrictMode>
      <App router="static" url={url} />
    </StrictMode>,
  );
};
