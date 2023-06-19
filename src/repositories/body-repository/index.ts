import { Body, Cards, Prisma } from "@prisma/client";
import { prisma } from "@/config";

async function find(linkId: number): Promise<Body & {Cards: Cards[]}> {
  return prisma.body.findFirst({
    where: {linkId},
    include: {
      Cards: true
    }
  });
}

async function create(data : Prisma.BodyUncheckedCreateInput) {
  return prisma.body.create({data});
}

async function update(id : number, imageProfile : string) {
  return prisma.body.update({
    where: {
      id
    },
    data:{
      imageProfile
    }
  })
}

const bodyRepository = {
  find,
  create,
  update
};

export default bodyRepository;
