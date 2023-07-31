import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  const user = await prisma.user.create({
    data: {
      name: "meng",
      email: "mengzhou44@gmail.com",
      age: 50,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    include: {
      userPreference: true,
    },
  });

  const found = await findUnique();
  console.log(found);

  const found2 = await findUniqueByAgeAndName();
  console.log(found2);
}

async function findUniqueByAgeAndName() {
  const found = await prisma.user.findUnique({
    where: {
      age_name: {
        age: 50,
        name: "meng",
      },
    },
    select: {
      id: true,
      email: true,
    },
  });
  return found;
}

async function findUnique() {
  const found = await prisma.user.findUnique({
    where: {
      email: "mengzhou44@gmail.com",
    },
    select: {
      id: true,
      email: true,
    },
  });
  return found;
}

main()
  .catch((e) => console.error(e.message))
  .finally(async () => {
    await prisma.$disconnect();
  });
