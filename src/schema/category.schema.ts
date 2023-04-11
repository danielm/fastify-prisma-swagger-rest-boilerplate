export const categorySchema = {
  type: 'object',
  properties: {
    id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
    name: { type: 'string' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: ['string', 'null'], format: 'date-time' },
    products: { type: 'array', items: { type: 'object' } },
  },
};

