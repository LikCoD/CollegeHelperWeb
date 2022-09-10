#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY ssl /usr/share/nginx/ssl
COPY --from=node  /app/dist/studyum /usr/share/nginx/html

