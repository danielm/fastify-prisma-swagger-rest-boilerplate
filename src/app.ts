import fastify from 'fastify'
import fastifyEnv from '@fastify/env';
import fastifyCors from '@fastify/cors';
import fastifyCompress from '@fastify/compress';
import fastifyHelmet from '@fastify/helmet';

import envSchema from './lib/env.schema';
import corsConfig from './lib/cors.config';
import loggerConfig from './lib/logger.config';
import compressConfig from './lib/compress.config';
import prismaPlugin from './plugins/prisma.plugin';

const main = async () => {
  const app = fastify({ logger: loggerConfig });

  // Now we setup our app, plugins and such
  await app.register(fastifyEnv, envSchema);
  await app.register(fastifyCors, corsConfig);
  await app.register(fastifyCompress, compressConfig);
  await app.register(fastifyHelmet, compressConfig);
  await app.register(prismaPlugin);
 
  return app;
};

export { main };

