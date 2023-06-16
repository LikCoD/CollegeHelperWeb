#stage 1
FROM node:lts as node
WORKDIR /app
COPY . .
COPY package.json .
COPY package-lock.json .
RUN npm install -f
RUN npm run build --omit=dev
#stage 2
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node  /app/dist/apps/studyum /usr/share/nginx/html

