/*
* Some global schemas, representing our stuff from the Database.
* These will be used mostly when serializing data in our responses.
*
* See More: https://www.fastify.io/docs/latest/Reference/Validation-and-Serialization/
*/

export const categorySchema = {
  $id: 'categorySchema',
  type: 'object',
  // required: ['name'],
  nullable: true,
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: ['string', 'null'], format: 'date-time' },
    products: { type: 'array', items: { $ref: 'productSchema#' } },
  },
};

export const productSchema = {
  $id: 'productSchema',
  type: 'object',
  // required: ['name', 'price', 'category'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    price: { type: 'number' },
    published: { type: 'boolean' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: ['string', 'null'], format: 'date-time' },
    category: { $ref: 'categorySchema#' }
  }
};
