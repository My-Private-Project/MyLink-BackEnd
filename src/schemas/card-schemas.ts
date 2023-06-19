import Joi from 'joi';
import { CreateCardParams, DeleteCardParams, UpdateCardParams } from '@/services/card-service';

export const cardSchema = Joi.object<CreateCardParams>({
  bodyId: Joi.number().required(),
  name: Joi.string().required(),
  link: Joi.string().uri().required()
});

export const cardUpdateSchema = Joi.object<UpdateCardParams>({
  id: Joi.number().required(),
  name: Joi.string(),
  link: Joi.string().uri()
});

export const cardDeleteSchema = Joi.object<DeleteCardParams>({
  id: Joi.number().required()
});