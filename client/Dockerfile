##########  Part 1: Install Base Dependencies  #################################
FROM node:13-slim as build

ARG NODE_ENV
ARG DEV_EMAIL
ARG ROOT_DOMAIN
ARG PORT
ARG DB_STRING
ARG COOKIE_SECRET
ARG CLOUDINARY_URL
ARG AZURE_STORAGE_ACCOUNT
ARG AZURE_STORAGE_ACCESS_KEY
ARG AUTH0_CLIENT_ID
ARG AUTH0_DOMAIN
ARG AUTH0_CLIENT_SECRET
ARG AUTH0_CALLBACK_URL
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG SEARCH_ENABLED
ARG ELASTISEARCH_NODE_URL

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

ENV NODE_ENV=${NODE_ENV}
ENV DEV_EMAIL=${DEV_EMAIL}
ENV ROOT_DOMAIN=${ROOT_DOMAIN}
ENV PORT=${PORT}
ENV DB_STRING=${DB_STRING}
ENV COOKIE_SECRET=${COOKIE_SECRET}
ENV CLOUDINARY_URL=${CLOUDINARY_URL}
ENV AZURE_STORAGE_ACCOUNT=${AZURE_STORAGE_ACCOUNT}
ENV AZURE_STORAGE_ACCESS_KEY=${AZURE_STORAGE_ACCESS_KEY}
ENV AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID}
ENV AUTH0_DOMAIN=${AUTH0_DOMAIN}
ENV AUTH0_CLIENT_SECRET=${AUTH0_CLIENT_SECRET}
ENV AUTH0_CALLBACK_URL=${AUTH0_CALLBACK_URL}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ENV SEARCH_ENABLED=${SEARCH_ENABLED}
ENV ELASTISEARCH_NODE_URL=${ELASTISEARCH_NODE_URL}

RUN ./docker-build.sh


##########  Part 4: Serve compiled files  ######################################
FROM nginx:alpine

COPY --from=build /app/client/dist/static /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
