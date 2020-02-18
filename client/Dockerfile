### Part 1: Build Angular App
FROM node:13.7 as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_OPTIONS --max-old-space-size=1024
# ENV npm_config_loglevel silent

COPY . /app

# Install dependencies
RUN npm install --quiet > /dev/null 2>&1
RUN npm install -g @angular/cli@7.1 --quiet

# Build
RUN ng build --aot --buildOptimizer --prod --progress --verbose


### Part 2: Serve compiled files
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
