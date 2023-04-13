# ---------------- To develop as a container
FROM node:lts-alpine as development

RUN apk add openssl1.1-compat

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

# ---------------- Build Prod Stage
FROM node:lts-alpine as build

RUN apk add openssl1.1-compat

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

# ---------------- Run Prod Stage
FROM node:lts-alpine as production

RUN apk add openssl1.1-compat

WORKDIR /app

COPY package*.json ./

COPY pm2.config.json ./

RUN npm install --production --no-audit --no-save --no-optional --no-fund --no-package-locknpm install

COPY --from=build /app/dist/src .

COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

RUN npx prisma generate

RUN npm install -g pm2

