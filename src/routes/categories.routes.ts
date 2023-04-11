import { FastifyInstance } from "fastify";

import { getCategories, getCategory } from "../controllers/categories.controller";

const getCategoriesSchema = {
  querystring: { $ref: 'paginationSchema' },
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
  response: {
    200: { $ref: 'categorySchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

export default async function (fastify: FastifyInstance) {
  // List all categories, paginated
  fastify.get('/', { schema: getCategoriesSchema }, getCategories);

  // Get one category, and its products (paginated)
  fastify.get('/:id', { schema: getCategorySchema }, getCategory);

  // fastify.post<{ Body: PostBody }>('/example', { schema: postSchema }, async (request, reply) => {
    // const { name } = request.body;

    // const createdCategory = await prisma.category.create({
    //   data: {
    //     name,
    //   },
    // });

    // reply.status(201).send(createdCategory);
  // });
}

