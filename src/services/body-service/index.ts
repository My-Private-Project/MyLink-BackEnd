import { Body, Cards, Link } from "@prisma/client";
import linkRepository from "@/repositories/link-repository";
import bodyRepository from "@/repositories/body-repository";
import { notFoundError } from "./errors";

export async function findBody(name: string): Promise<Body> {
  const link: Link = await linkRepository.findByName(name);

  if (!link) throw notFoundError();

  const body: Body & {Cards: Cards[]} = await bodyRepository.find(link.id);

  if (!body) throw notFoundError();

  return body;
};

export type BodyParams = Pick<Body, 'id'>;

export type UpdateBodyParams = Pick<Body, 'imageProfile'>

export async function updateBody(id : number, imageProfile : string): Promise<Body> {
  return await bodyRepository.update(id, imageProfile);
};



const bodyService = {
  findBody,
  updateBody
};

export default bodyService;