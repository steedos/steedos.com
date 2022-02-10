FROM node:12.19.1

# set timezone
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

COPY ./packages /app/packages
COPY ./public /app/public
COPY ./rehype /app/rehype
COPY ./remark /app/remark
COPY ./scripts /app/scripts
COPY ./src /app/src
COPY ./.babelrc /app
COPY ./.env /app
COPY ./.eslintrc.js /app
COPY ./jsconfig.json /app
COPY ./next-env.d.ts /app
COPY ./next.config.js /app
COPY ./package.json /app
COPY ./postcss.config.js /app
COPY ./prettier.config.js /app
COPY ./redirects.json /app
COPY ./tailwind.config.js /app
COPY ./tsconfig.json /app
COPY ./yarn.lock /app
# COPY ./.next /app/.next

# RUN npm config set registry http://registry.npm.taobao.org/
# RUN yarn config set registry http://registry.npm.taobao.org/
# ENV npm_config_sharp_binary_host="https://npm.taobao.org/mirrors/sharp"
# ENV npm_config_sharp_libvips_binary_host="https://npm.taobao.org/mirrors/sharp-libvips"

RUN yarn --force

RUN --mount=type=secret,id=STEEDOS_SERVER_API_KEY \
   export STEEDOS_SERVER_API_KEY=$(cat /run/secrets/STEEDOS_SERVER_API_KEY)

RUN yarn build

ENV NODE_ENV=production

CMD ["yarn", "start"]