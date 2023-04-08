const Config = {
  confKey: 'config',
  schema: {
    type: 'object',
    required: [ 'BIND_PORT' ],
    properties: {
      BIND_PORT: {
        type: 'number',
        default: 5000
      },
      BIND_ADDR: {
        type: 'string',
        default: '127.0.0.1'
      },
      APP_SERVER_NAME: {
        type: 'string',
        default: 'localhost'
      },
      PROJECT_NAME: {
        type: 'string',
        default: 'fastify-rest'
      },
    }
  },
};

export default Config;

