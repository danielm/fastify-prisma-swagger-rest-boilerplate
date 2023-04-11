export const paginationSchema = {
  $id: 'paginationSchema',
  type: 'object',
  properties: {
    take: {
      type: 'number',
      enum: [5, 10, 25],
      default: 10,
    },
    from: {
      type: 'string',
      pattern: '^[0-9a-fA-F]{24}$',
    },
  },
};

export const messageSchema = {
  $id: 'messageResponseSchema',
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
};

export const paramIdSchema = {
  $id: 'paramIdSchema',
  type: 'object',
  properties: {
    id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
  },
  required: ['id'],
};

