##########  Part 1: Build Angular App  #########################################
FROM node:13-slim as build

# For node-gyp (node-sass)
RUN apt-get update && apt-get install -y build-essential python

WORKDIR /app/client

ENV PATH /app/client/node_modules/.bin:$PATH
ENV NODE_OPTIONS --max-old-space-size=1024

COPY package*.json ./

# Install dependencies
RUN npm ci

COPY . .

# Prerender app (fill data from API)
RUN npm run prerender:compile && ng run prerender:express

# Run Angular build in production mode
#RUN ng build --prod="true" --progress


##########  Part 2: Serve compiled files  ######################################
FROM nginx:alpine

COPY --from=build /app/client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
