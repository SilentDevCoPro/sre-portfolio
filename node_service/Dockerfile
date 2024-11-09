FROM node:20

WORKDIR /usr

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "src/server.js"]