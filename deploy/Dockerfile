FROM node:lts as node
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build-state-mapper
RUN npm run build --omit=dev

FROM nginx:alpine
COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY --from=node  /app/dist/studyum /usr/share/nginx/html
