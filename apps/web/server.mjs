import fs from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT ?? 4200);
const clientDist = path.resolve(__dirname, 'dist/client');
const templatePath = isProduction ? path.join(clientDist, 'index.html') : path.resolve(__dirname, 'index.html');

const mimeTypes = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.map': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
  '.webp': 'image/webp',
};

let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    appType: 'custom',
    root: __dirname,
    server: { middlewareMode: true },
  });
}

const server = http.createServer(async (request, response) => {
  const url = request.url ?? '/';

  try {
    if (vite && isViteDevAssetRequest(url)) {
      await serveViteDevAsset(request, response);
      return;
    }

    if (isProduction && (await serveStaticAsset(url, response))) {
      return;
    }

    let template = await fs.readFile(templatePath, 'utf-8');
    let render;

    if (vite) {
      template = await vite.transformIndexHtml(url, template);
      ({ render } = await vite.ssrLoadModule('/src/entry-server.tsx'));
    } else {
      ({ render } = await import(pathToFileURL(path.join(__dirname, 'dist/server/entry-server.mjs')).href));
    }

    const appHtml = await render(url);
    const html = template.replace('<!--ssr-outlet-->', appHtml);

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(html);
  } catch (error) {
    if (vite) {
      vite.ssrFixStacktrace(error);
    }

    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end(error instanceof Error ? error.stack : String(error));
  }
});

server.listen(port, () => {
  console.log(`Web SSR server listening on http://localhost:${port}`);
});

function isViteDevAssetRequest(url) {
  const pathname = new URL(url, 'http://localhost').pathname;
  const vitePrefixes = ['/@fs/', '/@id/', '/@react-refresh', '/@vite/', '/node_modules/', '/src/'];

  return vitePrefixes.some((prefix) => pathname.startsWith(prefix)) || path.extname(pathname) !== '';
}

async function serveViteDevAsset(request, response) {
  await new Promise((resolve, reject) => {
    vite.middlewares(request, response, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

  if (!response.writableEnded) {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Not found');
  }
}

async function serveStaticAsset(url, response) {
  const pathname = decodeURIComponent(new URL(url, 'http://localhost').pathname);
  const filePath = path.normalize(path.join(clientDist, pathname));

  if (!filePath.startsWith(clientDist) || pathname === '/') {
    return false;
  }

  try {
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) {
      return false;
    }
  } catch {
    return false;
  }

  response.writeHead(200, {
    'Content-Type': mimeTypes[path.extname(filePath)] ?? 'application/octet-stream',
  });
  createReadStream(filePath).pipe(response);
  return true;
}
