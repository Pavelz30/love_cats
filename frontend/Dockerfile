FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN npm install -g typescript
RUN tsc frontend.ts
CMD ["node", "frontend.js"]

#CMD ["npm", "start"]
# Транспилируем TypeScript в JavaScript
#RUN tsc frontend.ts

# Запускаем приложение
#CMD ["node", "frontend.ts"]

