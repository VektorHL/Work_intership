FROM nginx:alpine
COPY ./dist /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /app
RUN apk add --update npm
RUN node -v

COPY ./app-config ./app-config

EXPOSE 80
CMD node app-config/createConfig.js /usr/share/nginx/html && cat /usr/share/nginx/html/assets/env.js && nginx -g "daemon off;"
