// See https://github.com/fastify/fastify-compress#compress-options
// Note: Please note that in large-scale scenarios, 
// you should use a proxy like Nginx to handle response compression.
export default {
  global: true,
  threshold: 1024,
};

