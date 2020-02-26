##########  Part 1: Build Angular App  #########################################
FROM node:13-slim as build

# For node-gyp (node-sass)
#RUN apt-get update && apt-get install -y build-essential python

WORKDIR /app/client

ENV PATH /app/client/node_modules/.bin:$PATH
ENV NODE_OPTIONS --max-old-space-size=1024
# ENV npm_config_loglevel silent

COPY package*.json /app/client/

# Install dependencies
RUN npm ci
#RUN npm install --quiet > /dev/null 2>&1
#RUN npm install -g @angular/cli@7.1 --quiet

COPY . .

# Build
#RUN ng build --aot --buildOptimizer --prod --progress
RUN /app/client/node_modules/@angular/cli/bin/ng \
  build --aot --buildOptimizer --prod --progress


##########  Part 2: Serve compiled files  ######################################
FROM nginx:alpine

COPY --from=build /app/client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
