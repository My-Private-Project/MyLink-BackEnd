import { Prisma } from "@prisma/client";
import { prisma } from "@/config";
import { UpdateCardParams } from "@/services/card-service";

async function create(data: Prisma.CardsUncheckedCreateInput) {
  return prisma.cards.create({
    data,
  });
}

async function findById(id : number) {
  return prisma.cards.findFirst({
    where: {
      id
    }
  })
}

async function update(data : UpdateCardParams) {
  return prisma.cards.update({
    where:{
      id: data.id
    },
    data:{
      name: data.name,
      link: data.link
    }
  })
}

async function remove(id : number) {
  return prisma.cards.delete({
    where:{
      id
    }
  })
}

const cardsRepository = {
  create,
  findById,
  update,
  remove
};

export default cardsRepository;
