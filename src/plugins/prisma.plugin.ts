import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prismaPlugin: FastifyPluginAsync =  fp(async function prismaPlugin(fastify: FastifyInstance) {
  const prisma = new PrismaClient();

  await prisma.$connect().then(() => {
    fastify.log.info('Connection established to database');
  });

  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async (instance) => {
    await instance.prisma.$disconnect().then(() => {
      fastify.log.info('Database connection closed');
    });
  });
});

export default prismaPlugin;

