# To develop as a container
FROM node:lts-alpine as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g nodemon

# Build Prod Stage
FROM node:lts-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Run Prod Stage
FROM node:lts-alpine as production

WORKDIR /app

COPY package*.json ./

COPY pm2.config.json ./

RUN npm install --production --no-audit --no-save --no-optional --no-fund --no-package-locknpm install

COPY --from=build /app/dist ./dist

RUN npm install -g pm2

EXPOSE 5000

