import { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      NODE_ENV: 'development' | 'production' | 'test';
      BIND_PORT: number;
      BIND_ADDR: string;
      PROJECT_NAME: string;
      APP_SERVER_NAME: string;
      DATABASE_URL: string;
      ENABLE_SWAGGER: boolean;
    };
  }
}
