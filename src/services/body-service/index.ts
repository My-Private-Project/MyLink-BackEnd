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

const bodyService = {
  findBody
};

export default bodyService;