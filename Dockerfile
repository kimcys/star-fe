# --- Build stage ---------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

# Same image serves two different deployments (this repo's own local
# docker-compose stack, and the real production one behind Caddy) that
# need different API URLs - overridden per build via --build-arg, e.g.
# in CI: --build-arg API_BASE_URL=https://api.aimanhakimcy.com. Left at
# its default, this matches the local docker-compose stack unchanged.
ARG API_BASE_URL=http://localhost:8000

# Copy just the manifest first so `npm ci` is cached unless
# package*.json actually changed, instead of on every source edit.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN printf 'export const environment = {\n  apiBaseUrl: '"'"'%s'"'"',\n};\n' "$API_BASE_URL" \
    > src/environments/environment.prod.ts
# `ng build` defaults to the production configuration (see angular.json),
# which is what swaps environment.prod.ts (just rewritten above) in for
# environment.ts.
RUN npm run build

# --- Runtime stage ---------------------------------------------------
# nginx-unprivileged instead of plain nginx: it's already set up to run
# entirely as a non-root user (including the master process) on an
# unprivileged port, rather than needing root just to bind :80 and then
# drop to a worker user.
FROM nginxinc/nginx-unprivileged:alpine
COPY --from=build /app/dist/star-fe/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
