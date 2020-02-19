FROM node:13-slim

# Install dependencies
RUN apt-get update && apt-get install -y git

WORKDIR /app/server

COPY package*.json /app/server/

RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["node", "app.js"]
