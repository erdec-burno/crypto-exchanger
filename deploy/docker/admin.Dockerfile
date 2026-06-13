FROM node:22-alpine AS build

WORKDIR /app

COPY . .
#RUN npm ci
RUN npm install --include=dev --package-lock=false

ARG VITE_API_BASE_URL

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run admin:build


FROM nginx:stable-alpine AS production

COPY deploy/nginx/admin.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/admin/dist /usr/share/nginx/html

EXPOSE 80
