FROM node:14

WORKDIR /app

COPY . .

RUN npm install && npm run build
RUN npm install -g typescript && tsc frontend.ts

CMD ["node", "frontend.js"]


