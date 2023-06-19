import { BodyParams, UpdateBodyParams } from '@/services/body-service';
import Joi from 'joi';

export const bodySchema = Joi.object<BodyParams>({
    id: Joi.string().required()
});

export const bodyUpdateSchema = Joi.object<UpdateBodyParams>({
  imageProfile: Joi.string().required()
});
