import { Cards } from "@prisma/client";
import { notFoundError } from "@/errors";
import cardsRepository from "@/repositories/cards-repository";

export async function createCard({ name, link, bodyId }: CreateCardParams) {
  return cardsRepository.create({
    name,
    link,
    bodyId,
    icone: ""
  });
};

export type CreateCardParams = Pick<Cards, 'name' | 'link' | 'bodyId'>;


export async function updateCard({ id, name, link} : UpdateCardParams){ 
  const card = await cardsRepository.findById(id);

  if (!card) throw notFoundError();

  return await cardsRepository.update({id, name, link});
};

export type UpdateCardParams = Pick<Cards, 'id' | 'name' | 'link'>;

export async function deleteCard(id : number){
  const card = await cardsRepository.findById(id);

  if (!card) throw notFoundError();

  return await cardsRepository.remove(id);
};

export type DeleteCardParams = Pick<Cards, 'id'>;

const cardService = {
  createCard,
  updateCard,
  deleteCard
};

export default cardService;