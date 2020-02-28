##########  Step 1: Set up environment  ########################################

FROM node:13-slim as build

# For node-gyp (node-sass, better-sqlite3)
RUN apt-get update && apt-get install -y build-essential git python

WORKDIR /app

RUN mkdir {client,server}

ENV PATH /app/client/node_modules/.bin:$PATH
ENV NODE_OPTIONS --max-old-space-size=1024

COPY client/package*.json client/
COPY server/package*.json server/


##########  Step 2: Set up server files  #######################################

WORKDIR /app/server

RUN npm ci

COPY ./server .


##########  Step 3: Set up client files  #######################################

WORKDIR /app/client

RUN npm ci

COPY ./client .


##########  Step 3.1: Install client content  ##################################

WORKDIR /app/client/content

RUN npm ci


##########  Step 4: Build static site  #########################################

WORKDIR /app/client

RUN npm run prerender:express & npm run prerender:compile


##########  Step 5: Serve compiled content  ####################################

FROM nginx:alpine

COPY --from=build /app/client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
