FROM node:20

WORKDIR /usr

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD ["node", "src/index.js"]