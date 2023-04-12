import { FastifyRequest, FastifyReply } from 'fastify';

export async function getCategories(request: FastifyRequest<CrudAllRequest>, reply: FastifyReply) {
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

export async function getCategory(request: FastifyRequest<CrudIdRequest>, reply: FastifyReply) {
  const { id } = request.params;

  let category = await request.server.prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    return reply.status(404).send({ message: 'Category not found' });
  }

  return reply.status(200).send(category);
}

export async function deleteCategory(request: FastifyRequest<CrudIdRequest>, reply: FastifyReply) {
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

