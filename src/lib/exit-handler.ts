import { FastifyInstance } from 'fastify';

/**
 * Handler for exit
 */
const exitHandler = (app: FastifyInstance, exitCode: number) => {
  app.close(() => {
    app.log.info('Server closed')
    process.exit(exitCode)
  })
};

/**
 * Error Handling
 */
const unexpectedErrorHandler = (app: FastifyInstance, error: any) => {
    app.log.error(error)
    exitHandler(app, 1)
};

/**
 * Application shutdown
 */
const gracefullyShutdown = (app: FastifyInstance) => {
  app.log.info('Attempting to gracefully shutdown the app...')
  exitHandler(app, 0)
};

export { unexpectedErrorHandler, gracefullyShutdown }

