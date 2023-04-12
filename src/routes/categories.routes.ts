import { FastifyInstance } from "fastify";

import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/categories.controller";
import { createSchema, deleteSchema, getAllSchema, getSchema, updateSchema } from "../schema/categories.schema";

export default async function (fastify: FastifyInstance) {
  // List all categories, paginated
  fastify.get('/', { schema: getAllSchema }, getCategories);

  // Get one category, and its published products (paginated)
  fastify.get('/:id', { schema: getSchema }, getCategory);

  // Deleteing a Category
  fastify.delete('/:id', { schema: deleteSchema }, deleteCategory);

  // Create a new Category
  fastify.post('/', { schema: createSchema }, createCategory);

  // Update an existing Category
  fastify.put('/:id', { schema: updateSchema }, updateCategory);
}

