FROM node:22-alpine

WORKDIR /app

COPY package.json  ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g pm2

EXPOSE 3000

CMD ["pm2-runtime", "dist/index.js", "--name", "fitpulse-api"]