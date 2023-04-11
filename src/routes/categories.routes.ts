import { FastifyInstance } from "fastify";

import { getCategories, getCategory } from "../controllers/categories.controller";
import { paginationSchema } from "../schema/pagination.schema";
import { categorySchema } from "../schema/category.schema";

const getCategoriesSchema = {
  querystring: paginationSchema.querystring,
  response: {
    200: {
      type: 'object',
      properties: {
        results: { type: 'array', items: categorySchema, },
        page: { type: 'number' },
      }
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
};

const getCategorySchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string'/*, format: 'uuid'*/ },
    },
    required: ['id'],
  },
  200: categorySchema,
  404: {
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  },
};

export default async function (fastify: FastifyInstance) {
  // List all
  fastify.get('/', { schema: getCategoriesSchema }, getCategories);

  // Get one
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

