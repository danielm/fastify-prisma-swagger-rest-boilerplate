/*
* Schemas used for Validation and Validation and Serialization of our routes/endpoints
*
* These are used to:
*  - Validate incoming requests (URL params, body, headers, query string)
*  - Automatically serialize the response objects
*  - Also, Swagger uses these schemas to generate the documentation!
*
* See More: https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/
*/

// GET '/'
export const getAllSchema = {
  querystring: { $ref: 'paginationSchema' },
  tags: ['products'],
  description: 'List all products, paginated using a cursor paginator.',
  response: {
    200: {
      type: 'object',
      properties: {
        results: { type: 'array', items: { $ref: 'productSchema#' } },
      }
    },
    404: { $ref: 'messageResponseSchema#' },
  },
};

// GET '/:id'
export const getSchema = {
  params:{ $ref: 'paramIdSchema' },
  tags: ['products'],
  description: 'Get a single product and its category)',
  response: {
    200: { $ref: 'productSchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

// DELETE '/:id'
export const deleteSchema = {
  params:{ $ref: 'paramIdSchema' },
  tags: ['products'],
  description: 'Removes an especific product from the collection',
  response: {
    200: { $ref: 'messageResponseSchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

// POST '/'
export const createSchema = {
  tags: ['products'],
  description: 'Creates a new Product',
  body: {
    type: 'object',
    required: ['name', 'price', 'categoryId'],
    properties: {
      name: { type: 'string' },
      price: { type: 'number' },
      published: { type: 'boolean', default: true },
      categoryId: { type: 'string', pattern: '^[0-9a-fA-F]{24}$'},
    }
  },
  response: {
    200: { $ref: 'productSchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

// PUT: '/:id'
export const updateSchema = {
  tags: ['products'],
  description: 'Updates a Product',
  params:{ $ref: 'paramIdSchema#' },
  body: {
    type: 'object',
    required: ['name', 'price', 'categoryId'],
    properties: {
      name: { type: 'string' },
      price: { type: 'number' },
      published: { type: 'boolean', default: true },
      categoryId: { type: 'string', pattern: '^[0-9a-fA-F]{24}$'},
    }
  },
  response: {
    200: { $ref: 'productSchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

