import { FastifyInstance } from "fastify";

import { getCategories, getCategory } from "../controllers/categories.controller";

const getCategoriesSchema = {
  querystring: { $ref: 'paginationSchema' },
  tags: ['categories'],
  description: 'List all categories, paginated using a cursor paginator.',
  response: {
    200: {
      type: 'object',
      properties: {
        results: { type: 'array', items: { $ref: 'categorySchema#' } },
      }
    },
    404: { $ref: 'messageResponseSchema#' },
  },
};

const getCategorySchema = {
  params:{ $ref: 'paramIdSchema' },
  querystring: { $ref: 'paginationSchema' },
  tags: ['categories'],
  description: 'Get a single category, and its related Products (paginated, using a cursor paginator)',
  response: {
    200: { $ref: 'categorySchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

export default async function (fastify: FastifyInstance) {
  // List all categories, paginated
  fastify.get('/', { schema: getCategoriesSchema }, getCategories);

  // Get one category, and its published products (paginated)
  fastify.get('/:id', { schema: getCategorySchema }, getCategory);
}

