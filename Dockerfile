# Usamos una imagen liviana y de Node.js
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]