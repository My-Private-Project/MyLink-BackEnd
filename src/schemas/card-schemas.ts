import Joi from 'joi';
import { CreateCardParams } from '@/services/card-service';

export const cardSchema = Joi.object<CreateCardParams>({
  bodyId: Joi.number().required(),
  name: Joi.string().required(),
  link: Joi.string().uri().required()
});

export const linkUpdateSchema = Joi.object<UpdateCardsParams>({
  id: Joi.number().required(),
  name: Joi.string(),
  link: Joi.string()
});

export const linkDeleteSchema = Joi.object<DeleteCardsParams>({
  id: Joi.number().required()
});