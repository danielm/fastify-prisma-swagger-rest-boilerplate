import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const categories = [];

  // Create 10 categories
  for (let i = 1; i <= 10; i++) {
    const category = await prisma.category.create({
      data: {
        name: faker.commerce.department(),
        createdAt: faker.date.past(1),
      },
      include: {
        products: true,
      },
    });

    categories.push(category);
  }

  // Create 10 products for each category
  for (const category of categories) {
    for (let i = 1; i <= 10; i++) {
      const product = await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          price: parseFloat(faker.commerce.price()),
          published: faker.datatype.boolean(),
          category: {
            connect: {
              id: category.id,
            },
          },
          createdAt: faker.date.past(1),
        },
      });

      console.log(`Created product ${product.name} in category ${category.name}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
