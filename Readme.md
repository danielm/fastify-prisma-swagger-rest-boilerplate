# 🚀 RESTfull APIs boilerplate using Fastify

Fastify provides high-performance web framework capabilities and is well-suited for building scalable APIs. It's lightweight and designed to handle a high volume of requests.

TypeScript provides one of the best developer experiences in `${currentyear}`, developers can catch errors during compilation rather than runtime, making it easier to catch issues early on in the development process. Additionally, It's strict typing system allows for easier maintenance of the codebase, making it easier to read and refactor code.

## Key Components
[Tyepscript](https://www.typescriptlang.org/) - [Fastify](https://github.com/fastify/fastify/) - [PrismaJS](https://github.com/prisma/prisma) - [Docker](https:///www.docker.com/) - [Swagger](https://swagger.io/) - [MongoDB](https://www.mongodb.com/) - [PM2](https://pm2.keymetrics.io/) - [FakerJS](https://github.com/faker-js/faker)

## Fastify plugins included
[@fastify/compress](https://github.com/fastify/fastify-compress) - [@fastify/cors](https://github.com/fastify/fastify-cors) - [@fastify/env](https://github.com/fastify/fastify-env) - [@fastify/helmet](https://github.com/fastify/fastify-helmet) - [@fastify/swagger](https://github.com/fastify/fastify-swagger) - [@fastify/swagger-ui](https://github.com/fastify/fastify-swagger-ui)

## Table of contents
- [Setup & Configuration](#setup--configuration)
- [Running locally](#running-locally)
- [Databases & MongoDB for development](#databases--mongodb-for-development)
- [File Structure](#file-structure)
- [Running as a Docker container](#running-as-a-docker-container)
- [Building for production](#building-for-production)
- [Debugging](#debugging)
- [Hot-Reloading](#hot-reloading)

---

## Setup & Configuration
Clone the repository:
```bash
git clone https://github.com/danielm/fastify-prisma-swagger-rest-boilerplate.git
```
Create a `.env` file from `.env.example` and tweak it as necessary.
> Some options need some tweaking if running locally or using docker. Read more bellow 👇

---

## Running locally
Make sure your `.env` file has the right settings, these in particular:
```env
# ...
BIND_PORT=5000
BIND_ADDR=127.0.0.1
DATABASE_URL=mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE
# ...
```
> [Check this section](#databases--mongodb) bellow to quickly spin up locally a MongoDB instance for development

Now, make sure you have installed [Node.js](http://www.nodejs.org) in any recent/lts version.

```bash
# Install all Dev-included dependencies
npm install
# Generates Prisma cliente metadata/types stuff
npx prisma generate
```

Running the project is simple as:

```bash
npm run start
```

Now you should be able access the project:
- APIs: http://127.0.0.1:5000/api/v1/*
- SwaggerUI documentation: http://127.0.0.1:5000/docs/

> **Note:** Inside the `docs/` you can [download a Postman collection](https://github.com/danielm/fastify-prisma-swagger-rest-boilerplate/blob/main/docs/Postman.collection.json) to import and play with the example APIs

### Other useful commands
```bash
# Very nice UI for data visualization of our database
npx prisma studio
# Synchronize your Prisma schema with your database
npx prisma db push
```

### Seed the local Database
```bash
# Seed our database with a bunch of random data
npx prisma db seed
```

---

## Databases & MongoDB for development
Since the project is using by default MongoDB, and It can be a little tricky to setup a replica set for just development:

> [Read more about Prisma and MongoDB](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb)

I've included in this project a quick way to spin up a single replica node, just by running:
```bash
make mongo
```

This will bring up a MongoDB instance using Docker. See `.env.example` for customizing some options.

---

## File Structure
```
├── prisma
│   ├── schema.prisma  // Prisma JS DB models/schemas
│   └── seed.ts        // Random data generator using FakerJS
└── src
    ├── app.ts
    ├── config         // Lots of config for fastify and plugins
    ├── controllers
    ├── index.ts       // Main entrypoints
    ├── lib            // Helper functions
    ├── plugins        // Custom plugins
    ├── routes
    └── types          // Typescript types and extensions
```

### The example project
The boilerplate includes an example of the following schema:
```
   +-------------+         +--------------+
   |   Category  |    1    |    Product   |
   +-------------+---------+--------------+
   | id          |         | id           |
   | name        |         | name         |
   | ...         |         | ...          |
   | products    |1-------N| category     |
   +-------------+         +--------------+
```
2 CRUDS are available, each root:
- Categories: http://127.0.0.1:5000/api/v1/categories/*
- Products: http://127.0.0.1:5000/api/v1/products/*
- Check the Swagger UI for all routes: http://127.0.0.1:5000/docs

## Running as a Docker container
During development:

```bash
# Build the docker image
make dev
# Start the container
make up
```

Make sure to have the right settings, these two in particular:
```env
# File: .env

BIND_ADDR=0.0.0.0

# make sure that mongodb host is: 'mongo' instead of '127.0.0.1'
DATABASE_URL="mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE"
# ...
```

---

## Building for production
```
# Build the image
make prod
```
The production image uses [PM2](https://pm2.keymetrics.io/) for process management, see the content of `pm2.config.json` for settings.

---

## Debugging
```bash
npm run debug
```

This will start the application with code inspection enabled for debugging.

If using VSCode just open the Debug tab, and use the play Button.

If not, use your favourite debugger and connect to: ```0.0.0.0:9229```

## Hot-Reloading

When running by `npm run start` or using the `dev` docker image, the app runs using `nodemon` watching for changes and recompiling the app if necessary.

