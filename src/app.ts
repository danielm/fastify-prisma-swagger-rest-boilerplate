import fastify from 'fastify'
import fastifyEnv from '@fastify/env';

import config from './lib/config.schema';
import logger from './lib/logger';

const main = async () => {
  const app = fastify({ logger: logger });

  // Now we setup our app, plugins and such
  await app.register(fastifyEnv, config);
 
  return app;
};

export { main };

