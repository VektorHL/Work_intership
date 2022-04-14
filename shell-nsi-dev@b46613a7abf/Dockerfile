FROM docker.devsun.ru/builders/npm-webpack:node14.15.5 as builder

ARG BRANCH_NAME

ADD app /app
WORKDIR /app

RUN yarn install

ADD app/app-config /app/app-config
RUN ./build.sh


FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /app
RUN apk add --update npm
RUN node -v

COPY app/app-config ./app-config

EXPOSE 80
CMD node app-config/createConfig.js /usr/share/nginx/html && cat /usr/share/nginx/html/assets/env.js && nginx -g "daemon off;"

