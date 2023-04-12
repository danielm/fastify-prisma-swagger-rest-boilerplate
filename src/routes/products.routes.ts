import { FastifyInstance } from "fastify";

import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/products.controller";
import { getAllSchema, getSchema, deleteSchema, createSchema, updateSchema } from "../schema/products.schema";

export default async function (fastify: FastifyInstance) {
  // List all products, paginated
  fastify.get('/', { schema: getAllSchema }, getProducts);

  // Get one product
  fastify.get('/:id', { schema: getSchema }, getProduct);

  // Deleteing a Product
  fastify.delete('/:id', { schema: deleteSchema }, deleteProduct);

  // Create a new Product
  fastify.post('/', { schema: createSchema }, createProduct);

  // Update an existing Category
  fastify.put('/:id', { schema: updateSchema }, updateProduct);
}

