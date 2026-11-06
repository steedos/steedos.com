# Build the static site, then serve it with nginx on port 3000 (the port the
# k8s Service already targets). Content is in the repo, so the build needs no
# secrets or network access to the CMS.
FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM nginx:1.27-alpine
ENV TZ=Asia/Shanghai
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/.nginx/redirects.conf /etc/nginx/redirects.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
