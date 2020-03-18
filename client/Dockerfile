##########  Part 1: Install Base Dependencies  #################################
FROM node:13-slim as build

# For node-gyp (node-sass)
RUN apt-get update && apt-get install -y build-essential git python

WORKDIR /app/client

ENV PATH /app/client/node_modules/.bin:$PATH
ENV NODE_OPTIONS --max-old-space-size=1024

COPY package*.json ./

RUN npm ci


##########  Part 2: Install Content Dependencies  ##############################
WORKDIR /app/client/content

COPY content/package*.json ./

RUN npm ci


##########  Part 3: Compile  ###################################################
WORKDIR /app/client

COPY . .

RUN ./docker-build.sh


##########  Part 4: Serve compiled files  ######################################
FROM nginx:alpine

COPY --from=build /app/client/dist/static /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
