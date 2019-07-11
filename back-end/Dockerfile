FROM node:10-alpine

RUN mkdir -p /home/node/server/node_modules && chown -R node:node /home/node/server

WORKDIR /home/node/server

COPY . /home/node/server/

USER node

RUN npm install

#RUN node index.js

EXPOSE 5000

CMD [ "node", "index.js" ]

