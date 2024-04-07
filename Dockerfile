FROM oven/bun:1 as builder

WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json bun.lockb ./

# install project dependencies
RUN bun install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN bun run build

FROM nginx:alpine as production-build
#COPY ./deploy/nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
# Copy from the stage 1
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY deploy/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]