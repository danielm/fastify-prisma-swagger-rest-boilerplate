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

export const getSchema = {
  params:{ $ref: 'paramIdSchema' },
  querystring: { $ref: 'paginationSchema' },
  tags: ['categories'],
  description: 'Get a single category, and its related Products (paginated, using a cursor paginator)',
  response: {
    200: { $ref: 'categorySchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

export const deleteSchema = {
  params:{ $ref: 'paramIdSchema' },
  tags: ['categories'],
  description: 'Removes an especific cateory from the collection',
  response: {
    200: { $ref: 'messageResponseSchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

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

export const updateSchema = {
  tags: ['categories'],
  description: 'Updates a Category',
  body: {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string' }
    }
  },
  params:{ $ref: 'paramIdSchema#' },
  response: {
    200: { $ref: 'categorySchema#' },
    404: { $ref: 'messageResponseSchema#' },
  }
};

