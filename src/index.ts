import { main } from './app';

main()
  .then(app => {
    app.listen({ port: app.config.BIND_PORT, host: app.config.BIND_ADDR })
      .then((addr) => {
        console.log('Server setup ready, and waiting for connections', addr);
      })
  })
  .catch(err => console.log(err))

