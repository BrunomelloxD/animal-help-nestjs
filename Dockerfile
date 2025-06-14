FROM node:lts-alpine3.19 as nest-api


RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

COPY .docker/node/entrypoint.sh ./

EXPOSE 3000
RUN chmod +x ./entrypoint.sh
CMD ["sh", "./entrypoint.sh" ]