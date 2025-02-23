FROM node:20

WORKDIR /

COPY package*.json ./

RUN npm install

ENV NODE_OPTIONS="--max-old-space-size=2048"

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
