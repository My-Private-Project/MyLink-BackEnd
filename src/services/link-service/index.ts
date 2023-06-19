import { Link } from "@prisma/client";
import { duplicatedNameError } from "./errors";
import linkRepository from "@/repositories/link-repository";
import { notFoundError } from "@/errors";
import bodyRepository from "@/repositories/body-repository";

export async function createLink({ name, userId }: CreateLinkParams): Promise<Link> {
  await validateUniqueNameOrFail(name);

  const link = await linkRepository.create({ name, userId });
  await bodyRepository.create({
    imageProfile: "",
    cover:"",
    linkId: link.id
  });

  return link;
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

export async function updateLink({ id, name }: UpdateLinkParams){
  await validateUniqueNameOrFail(name);
  
  const link = await linkRepository.findById(id);

  if (!link) throw notFoundError();

  return await linkRepository.update({id,name});
};

export type UpdateLinkParams = Pick<Link, 'id' | 'name'>;

export async function deleteLink(linkId: number){
  const link = await linkRepository.findById(linkId);

  if (!link) throw notFoundError();

  return await linkRepository.remove(linkId);
};

export type DeleteLinkParams = Pick<Link, 'id'>;

const linkService = {
  createLink,
  allLinks,
  updateLink,
  deleteLink
};

export default linkService;