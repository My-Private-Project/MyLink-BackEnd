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

const bodyRepository = {
  find
};

export default bodyRepository;
