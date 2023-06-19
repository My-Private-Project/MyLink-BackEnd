import { Cards } from "@prisma/client";
import { duplicatedNameError } from "./errors";
import linkRepository from "@/repositories/link-repository";
import { notFoundError } from "@/errors";

export async function createCard({ name, link, bodyId }: CreateCardParams): Promise<Cards> {
  await validateUniqueNameOrFail(name);

  return cardsRepository.create({
    name,
    link,
    bodyId
  });
};

async function validateUniqueNameOrFail(name: string) {
  const cardWithSameName = await cardsRepository.findByName(name);
  if (cardWithSameName) {
    throw duplicatedNameError();
  }
}

export type CreateCardParams = Pick<Cards, 'name' | 'link' | 'bodyId'>;

export async function allCards(bodyId: number): Promise<Cards[]> {
  const cards: Cards[] = await cardsRepository.find(bodyId);

  if (!cards) throw notFoundError();

  return cards;
};

export async function updateLink({ id, name }: UpdateCardParams){
  await validateUniqueNameOrFail(name);
  
  const link = await linkRepository.findById(id);

  if (!link) throw notFoundError();

  return await linkRepository.update({id,name});
};

export type UpdateCardParams = Pick<Cards, 'id' | 'name' | 'link'>;

export async function deleteLink(linkId: number){
  const link = await linkRepository.findById(linkId);

  if (!link) throw notFoundError();

  return await linkRepository.remove(linkId);
};

export type DeleteCardParams = Pick<Cards, 'id'>;

const cardService = {
  createLink,
  allLinks,
  updateLink,
  deleteLink
};

export default cardService;