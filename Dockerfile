FROM node:14

RUN mkdir -p /usr/src/app
RUN chmod -R 777 /usr/src/app

WORKDIR /usr/app

COPY package*.json ./

COPY . .

EXPOSE 3000
CMD [ "node", ""]