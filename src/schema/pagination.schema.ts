export const paginationSchema = {
  querystring: {
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
      // page: {
      //   type: 'integer',
      //   minimum: 1,
      //   default: 1,
      // },
    },
  },
};

