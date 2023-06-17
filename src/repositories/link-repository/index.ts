import { Prisma } from "@prisma/client";
import { prisma } from "@/config";
import { UpdateLinkParams } from "@/services/link-service";

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

async function findById(id: number) {
  return prisma.link.findUnique({
    where: {
      id,
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

async function update(data : UpdateLinkParams) {
  return prisma.link.update({
    where:{
      id: data.id
    },
    data:{
      name: data.name
    }
  })
}

async function remove(id : number) {
  return prisma.link.delete({
    where:{
      id
    }
  })
}

const linkRepository = {
  create,
  find,
  findByName,
  findById,
  update,
  remove
};

export default linkRepository;
