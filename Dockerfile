# Étape unique : Build React
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Garder seulement le build pour pipeline CI/CD
CMD ["echo", "React build ready in /app/build"]