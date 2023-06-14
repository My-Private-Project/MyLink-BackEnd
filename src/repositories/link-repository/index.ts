import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: Prisma.LinkUncheckedCreateInput) {
    return prisma.link.create({
      data,
    });
}

async function findByName(name: string, select?: Prisma.LinkSelect) {
    const params: Prisma.LinkFindUniqueArgs = {
      where: {
        name,
      },
    };
  
    if (select) {
      params.select = select;
    }
  
    return prisma.link.findUnique(params);
}

async function find(userId: number) {
  return prisma.link.findMany({
    where: {
      userId
    }
  });
}

const linkRepository = {
    create,
    find,
    findByName
  };
  
  export default linkRepository;
  