FROM node:18.9.0-alpine

# Copy package.json and install dependencies first to leverage image cache
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install -y

# Copy sources so that image rebuilds are faster
COPY src src
COPY index.js index.js

CMD [ "node", "index.js" ]
