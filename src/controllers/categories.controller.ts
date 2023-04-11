import { FastifyRequest, FastifyReply } from 'fastify';

type QueryListRequest = {
  Querystring: { take: number; page: number; }
}

type QueryItemId = {
  id: string;
}

export async function getCategories(request: FastifyRequest<QueryListRequest>, reply: FastifyReply) {
  const { take, page } = request.query;

  let results = await request.server.prisma.category.findMany({
    skip: (page - 1) * take,
    /*orderBy: [{ role: 'desc'}],*/
  });

  if (results.length === 0) {
    return reply.status(404).send({ message: "No elements to display" });
  }

  return reply.status(200).send({
    results,
    page,
  });
}

export async function getCategory(request: FastifyRequest<{ Params: QueryItemId }>, reply: FastifyReply) {
  const { id } = request.params;

  let category = await request.server.prisma.category.findUnique({
    where: { id },
    // include: { products: true },
  });

  if (!category) {
    return reply.status(404).send({ message: 'Category not found' });
  }

  return reply.status(200).send(category);
}

