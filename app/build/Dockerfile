FROM node:12

WORKDIR /opt/dogma/app
COPY package*.json ./
RUN npm install
EXPOSE 8080
CMD [ "node", "server.js" ]

