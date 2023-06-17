import Joi from 'joi';
import { DeleteLinkParams, LinkParams, UpdateLinkParams } from '@/services/link-service';

export const linkSchema = Joi.object<LinkParams>({
  name: Joi.string().required()
});

export const linkUpdateSchema = Joi.object<UpdateLinkParams>({
  id: Joi.number().required(),
  name: Joi.string().required()
});

export const linkDeleteSchema = Joi.object<DeleteLinkParams>({
  id: Joi.number().required()
});