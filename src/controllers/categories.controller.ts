import { FastifyRequest, FastifyReply } from 'fastify';

export async function getCategories(request: FastifyRequest<IPaginatorRequest>, reply: FastifyReply) {
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

export async function getCategory(request: FastifyRequest<ISingleRequest>, reply: FastifyReply) {
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

export async function deleteCategory(request: FastifyRequest<ISingleRequest>, reply: FastifyReply) {
  const { id } = request.params;

  await request.server.prisma.category.delete({
    where: { id },
  });

  return reply.status(202).send({ message: 'Category deleted' });
}

export async function createCategory(request: FastifyRequest<IPostCategory>, reply: FastifyReply) {
  const { name } = request.body;

  let category = await request.server.prisma.category.create({
    data: {
      name,
    }
  });

  return reply.status(201).send(category);
}

export async function updateCategory(request: FastifyRequest<IPutCategory>, reply: FastifyReply) {
  const { name } = request.body;
  const { id } = request.params;

  // TODO: updateAt date
  let category = await request.server.prisma.category.update({
    where: { id },
    data: { name },
  });

  return reply.status(200).send(category);
}

