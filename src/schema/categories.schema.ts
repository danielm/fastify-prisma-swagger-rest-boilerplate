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

// GET '/:id'
export const getSchema = {
  params:{ $ref: 'paramIdSchema' },
  tags: ['categories'],
  description: 'Get a single category)',
  response: {
    200: { $ref: 'categorySchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

// DELETE '/:id'
export const deleteSchema = {
  params:{ $ref: 'paramIdSchema' },
  tags: ['categories'],
  description: 'Removes an especific cateory from the collection',
  response: {
    200: { $ref: 'messageResponseSchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

// POST '/'
export const createSchema = {
  tags: ['categories'],
  description: 'Creates a new Category',
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' }
    }
  },
  response: {
    200: { $ref: 'categorySchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

// PUT: '/:id'
export const updateSchema = {
  tags: ['categories'],
  description: 'Updates a Category',
  params:{ $ref: 'paramIdSchema#' },
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' }
    }
  },
  response: {
    200: { $ref: 'categorySchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

