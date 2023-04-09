import { PinoLoggerOptions } from "fastify/types/logger";

const environmentConfigs = {
  development: {
    level: 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
};

function getConfig(): PinoLoggerOptions | boolean {
  const env = process.env.NODE_ENV || 'development';

  switch (env) {
    case 'development':
      return environmentConfigs.development;
    case 'production':
      return environmentConfigs.production;
    default:
      return false;
  }
}

export default getConfig();

