FROM node:14

# set timezone
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ARG API_TOKEN
ARG KEYCLOAK_SECRET
ARG STEEDOS_IDENTITY_JWT_SECRET
ARG NEXTAUTH_SECRET
WORKDIR /app

COPY ./public /app/public
COPY ./contents /app/contents
COPY ./rehype /app/rehype
COPY ./remark /app/remark
COPY ./scripts /app/scripts
COPY ./src /app/src
COPY ./.env /app
COPY ./jsconfig.json /app
COPY ./next-env.d.ts /app
COPY ./next.config.js /app
COPY ./next-sitemap.js /app
COPY ./package.json /app
COPY ./postcss.config.js /app
COPY ./prettier.config.js /app
COPY ./sentry.client.config.js /app
COPY ./sentry.properties /app
COPY ./sentry.server.config.js /app
COPY ./redirects.json /app
COPY ./tailwind.config.js /app
COPY ./tsconfig.json /app
COPY ./x.babelrc /app
COPY ./yarn.lock /app
# COPY ./.next /app/.next

ENV STEEDOS_SERVER_API_KEY=$API_TOKEN
ENV KEYCLOAK_SECRET=$KEYCLOAK_SECRET
ENV STEEDOS_IDENTITY_JWT_SECRET=$STEEDOS_IDENTITY_JWT_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXT_PUBLIC_NEXTAUTH_PROVIDER_ID=keycloak

# RUN npm config set registry http://registry.npm.taobao.org/
# RUN yarn config set registry http://registry.npm.taobao.org/
# ENV npm_config_sharp_binary_host="https://npm.taobao.org/mirrors/sharp"
# ENV npm_config_sharp_libvips_binary_host="https://npm.taobao.org/mirrors/sharp-libvips"

RUN yarn

RUN yarn build

ENV NODE_ENV=production

CMD ["yarn", "start"]
