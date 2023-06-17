import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

async function create(data: Prisma.LinkUncheckedCreateInput) {
  return prisma.link.create({
    data,
  });
}

async function findByName(name: string) {
  return prisma.link.findUnique({
    where: {
      name,
    },
  });
}

async function find(userId: number) {
  return prisma.link.findMany({
    where: {
      userId,
    },
  });
}

const linkRepository = {
  create,
  find,
  findByName,
};

export default linkRepository;
