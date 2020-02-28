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


##########  Step 4: Build static site  #########################################

# We're already in /app/client

RUN npm run prerender:compile && npm run prerender:express


##########  Step 5: Serve compiled content  ####################################

FROM nginx:alpine

COPY --from=build /app/client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
