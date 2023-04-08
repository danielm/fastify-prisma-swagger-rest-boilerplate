import fastify from 'fastify'
import fastifyEnv from '@fastify/env';

import config from './config';

const main = async () => {
  const app = fastify({ logger: true });

  // Now we setup our app, plugins and such
  await app.register(fastifyEnv, config);
 
  return app;
};

export { main };

