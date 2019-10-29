FROM node:12.13.0
RUN npm install -g --unsafe-perm prisma2

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
# RUN npm run build
RUN prisma2 generate

CMD ["npm", "run", "dev"]