FROM node:12.13.0
RUN npm install -g --unsafe-perm prisma2

RUN mkdir /app
WORKDIR /app

COPY ./ ./prisma/

CMD ["npx", "prisma2", "dev"]