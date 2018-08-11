FROM node:9.11.1-alpine

LABEL maintainer="andrea.sessa@mail.polimi.it"

WORKDIR /usr/share/mqtt
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3030
CMD ["npm", "start"]
