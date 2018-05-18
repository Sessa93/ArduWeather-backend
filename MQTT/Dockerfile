FROM node:latest

LABEL maintainer="andrea.sessa@mail.polimi.it"
WORKDIR /usr/share/mqtt
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 1883
CMD [ "npm", "start" ]
