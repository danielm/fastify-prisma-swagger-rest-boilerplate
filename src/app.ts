import fastify from 'fastify'
import fastifyEnv from '@fastify/env';
import fastifyCors from '@fastify/cors';
import fastifyCompress from '@fastify/compress';
import fastifyHelmet from '@fastify/helmet';

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

import envConfig from './lib/env.config';
import corsConfig from './config/cors.config';
import loggerConfig from './config/logger.config';
import compressConfig from './config/compress.config';
import prismaPlugin from './plugins/prisma.plugin';
import helmetConfig from './config/helmet.config';
import { swaggerConfig } from './config/swagger.config';

import productsRoutes from './routes/products.routes';
import categoriesRoutes from './routes/categories.routes';
import { messageSchema, paramIdSchema, paginationSchema } from './schema/common.schema';
import { categorySchema, productSchema } from './schema/models.schema';

const main = async () => {
  const app = fastify({ logger: loggerConfig });

  // Now we setup our app, plugins and such
  await app.register(fastifyEnv, envConfig);
  await app.register(fastifyCors, corsConfig);
  await app.register(fastifyCompress, compressConfig);
  await app.register(fastifyHelmet, helmetConfig);
  await app.register(prismaPlugin);

  // Json Schemas
  app.addSchema(paginationSchema);
  app.addSchema(paramIdSchema);
  app.addSchema(messageSchema);

  app.addSchema(categorySchema);
  app.addSchema(productSchema);

  // Swagger Docs
  if (app.config.ENABLE_SWAGGER) {
    await app.register(fastifySwagger, swaggerConfig);
    await app.register(fastifySwaggerUi, {
      routePrefix: '/docs',
    });
  }

  // API Endpoint routes
  await app.register(async api => {
    api.register(categoriesRoutes, { prefix: "/categories" });
    api.register(productsRoutes, { prefix: "/products" });
  }, { prefix: "/api/v1" });

  return app;
};

export { main };

