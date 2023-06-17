import { Link } from "@prisma/client";
import { duplicatedNameError } from "./errors";
import linkRepository from "@/repositories/link-repository";
import { notFoundError } from "@/errors";

export async function createLink({ name, userId }: CreateLinkParams): Promise<Link> {
  await validateUniqueNameOrFail(name);

  return linkRepository.create({
    name,
    userId,
  });
};

async function validateUniqueNameOrFail(name: string) {
  const linkWithSameName = await linkRepository.findByName(name);
  if (linkWithSameName) {
    throw duplicatedNameError();
  }
}

export type CreateLinkParams = Pick<Link, 'name' | 'userId'>;

export type LinkParams = Pick<Link, 'name'>;

export async function allLinks(userId: number): Promise<Link[]> {
  const links: Link[] = await linkRepository.find(userId);

  if (!links) throw notFoundError();

  return links;
};

const linkService = {
  createLink,
  allLinks
};

export default linkService;