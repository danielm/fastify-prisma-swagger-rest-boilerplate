export const categorySchema = {
  $id: 'categorySchema',
  type: 'object',
  required: ['name'],
  properties: {
    id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
    name: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    // updatedAt: { type: ['string', 'null'], format: 'date-time' },
    products: { type: 'array', items: { $ref: 'productSchema#' } },
  },
};

export const productSchema = {
  $id: 'productSchema',
  type: 'object',
  required: ['name', 'price', 'category'],
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    price: { type: 'number' },
    // published: { type: 'boolean' },
    createdAt: { type: 'string', format: 'date-time' },
    // updatedAt: { type: ['string', 'null'], format: 'date-time' },
    category: { $ref: 'categorySchema#' }
  }
};
