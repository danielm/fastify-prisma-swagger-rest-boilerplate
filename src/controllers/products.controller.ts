import { FastifyRequest, FastifyReply } from 'fastify';

export async function getProducts(request: FastifyRequest<CrudAllRequest>, reply: FastifyReply) {
  const { take, from } = request.query;

  let results = await request.server.prisma.product.findMany({
    cursor: from ? { id: from } : undefined,
    skip: from ? 1 : undefined,
    take,
    orderBy: { id: 'desc' },
    include: { category: true },
  });

  if (results.length === 0) {
    return reply.status(404).send({ message: "No elements found" });
  }

  return reply.status(200).send({ results });
}

export async function getProduct(request: FastifyRequest<CrudIdRequest>, reply: FastifyReply) {
  const { id } = request.params;

  let product = await request.server.prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    return reply.status(404).send({ message: 'Product not found' });
  }

  return reply.status(200).send(product);
}

export async function deleteProduct(request: FastifyRequest<CrudIdRequest>, reply: FastifyReply) {
  const { id } = request.params;

  await request.server.prisma.product.delete({
    where: { id },
  });

  return reply.status(200).send({ message: 'Product deleted' });
}

export async function createProduct(request: FastifyRequest<PostProduct>, reply: FastifyReply) {
  const { name, price, published, categoryId } = request.body;

  let product = await request.server.prisma.product.create({
    data: {
      name,
      price,
      published,
      category: {
        connect: {
          id: categoryId
        }
      }
    },
  });

  return reply.status(201).send(product);
}

export async function updateProduct(request: FastifyRequest<PutProduct>, reply: FastifyReply) {
  const { name, price, published, categoryId } = request.body;
  const { id } = request.params;

  let product = await request.server.prisma.product.update({
    where: { id },
    data: {
      name,
      price,
      published,
      category: {
        connect: {
          id: categoryId
        }
      }
},
  });

  return reply.status(200).send(product);
}

