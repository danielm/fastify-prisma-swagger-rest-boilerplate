import { FastifyRequest, FastifyReply } from 'fastify';

export async function getCategories(request: FastifyRequest<{ Querystring: PaginatorRequest }>, reply: FastifyReply) {
  const { take, from } = request.query;

  let results = await request.server.prisma.category.findMany({
    cursor: from ? { id: from } : undefined,
    skip: from ? 1 : undefined,
    take,
    orderBy: { id: 'desc' }
  });

  if (results.length === 0) {
    return reply.status(404).send({ message: "No elements found" });
  }

  return reply.status(200).send({ results });
}

export async function getCategory(request: FastifyRequest<{ Params: IdParamRequest, Querystring: PaginatorRequest }>, reply: FastifyReply) {
  const { id } = request.params;
  const { take, from } = request.query;

  let category = await request.server.prisma.category.findUnique({
    where: { id },
    include: {
      products: {
        cursor: from ? { id: from } : undefined,
        skip: from ? 1 : undefined,
        take,
        where: { published: true },
        orderBy: { id: 'desc' }
      }
    },
  });

  if (!category) {
    return reply.status(404).send({ message: 'Category not found' });
  }

  return reply.status(200).send(category);
}

export async function deleteCategory(request: FastifyRequest<{ Params: IdParamRequest }>, reply: FastifyReply) {
  const { id } = request.params;

  await request.server.prisma.category.delete({
    where: { id },
  });

  return reply.status(200).send({ message: 'Category deleted' });
}

export async function createCategory(request: FastifyRequest<PostCategory>, reply: FastifyReply) {
  const { name } = request.body;

  let category = await request.server.prisma.category.create({
    data: {
      name,
    }
  });

  return reply.status(201).send(category);
}

export async function updateCategory(request: FastifyRequest<PutCategory>, reply: FastifyReply) {
  const { name } = request.body;
  const { id } = request.params;

  let category = await request.server.prisma.category.update({
    where: { id },
    data: { name },
  });

  return reply.status(200).send(category);
}

