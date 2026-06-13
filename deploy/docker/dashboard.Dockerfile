FROM node:22-alpine AS build

WORKDIR /app

COPY . .
RUN npm install --include=dev --package-lock=false

RUN npm exec nx -- run @crypto-exchanger/dashboard:build --skip-sync
RUN npm prune --omit=dev


FROM node:22-alpine AS production

WORKDIR /app/apps/dashboard

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=build --chown=node:node /app/node_modules /app/node_modules
COPY --from=build --chown=node:node /app/apps/dashboard/build ./build

USER node

EXPOSE 3000

CMD ["/app/node_modules/.bin/react-router-serve", "build/server/index.js"]
