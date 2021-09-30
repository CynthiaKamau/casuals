FROM node:alpine as builder
WORKDIR '/app/casuals-api'
COPY package.json /app/casuals-api
RUN npm install
COPY . /app/casuals-api
RUN ["npm", "run", "build"]

FROM nginx
EXPOSE 80
COPY --from=builder /app/casuals-api/build /usr/share/nginx/html