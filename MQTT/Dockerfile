FROM nginx:latest

LABEL maintainer="andrea.sessa@mail.polimi.it"

RUN apt-get update \
	&& apt-get install -y curl git bzip2 libfontconfig1-dev gnupg2

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && apt-get install -y nodejs \
    && apt-get install -y build-essential

WORKDIR /usr/share/mqtt
COPY package*.json ./

RUN npm install
COPY . .

RUN rm -f /etc/nginx/nginx.conf
ADD nginx.conf /etc/nginx/

EXPOSE 1883
CMD ["./start.sh"]
