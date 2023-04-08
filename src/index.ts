import { main } from './app';
import { gracefullyShutdown, unexpectedErrorHandler } from './lib/exit-handler';

/*
 * Build service
 */
main()
  .then(app => {
    
    // At this point we should be able to gracefully handle all this... We hope
    process.on('uncaughtException', (err) => unexpectedErrorHandler(app, err))
    process.on('unhandledRejection', (err) => unexpectedErrorHandler(app, err))
    process.on('SIGTERM', () => gracefullyShutdown(app))
    process.on('SIGINT', () => gracefullyShutdown(app))

    /*
     * Start me up...
     */
    app.listen({ port: app.config.BIND_PORT, host: app.config.BIND_ADDR })
      .then((_) => {
        app.log.info('Ready, Waiting for connections...')
      })
      .catch((err) => {
        app.log.error({
          addr: app.config.BIND_ADDR,
          port: app.config.BIND_PORT,
          error: err.message,
        }, 'Failed to start server')
      });
  })
  .catch(err => { console.log(err); process.exit(1); })

