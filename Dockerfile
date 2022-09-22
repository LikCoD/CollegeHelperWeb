#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --omit=dev
#stage 2
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY ssl /srv/ssl
COPY --from=node  /app/dist/studyum /usr/share/nginx/html

