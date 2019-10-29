FROM node:12.13.0

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install

CMD ["npm", "run", "dev"]