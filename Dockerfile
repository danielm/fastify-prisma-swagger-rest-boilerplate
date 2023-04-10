# ---------------- To develop as a container
FROM node:lts-alpine as development

RUN apk add openssl1.1-compat

WORKDIR /app

COPY package*.json ./

RUN npm install

# RUN npx prisma generate

# RUN npx prisma db push

# RUN npx prisma seed

COPY . .

# ---------------- Build Prod Stage
FROM node:lts-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# ---------------- Run Prod Stage
FROM node:lts-alpine as production

WORKDIR /app

COPY package*.json ./

COPY pm2.config.json ./

RUN npm install --production --no-audit --no-save --no-optional --no-fund --no-package-locknpm install

COPY --from=build /app/dist ./dist

RUN npm install -g pm2

