# --- Build stage ---------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

# Copy just the manifest first so `npm ci` is cached unless
# package*.json actually changed, instead of on every source edit.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# `ng build` defaults to the production configuration (see angular.json).
RUN npm run build

# --- Runtime stage ---------------------------------------------------
FROM nginx:alpine
COPY --from=build /app/dist/star-fe/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
