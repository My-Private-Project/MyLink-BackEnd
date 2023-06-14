import Joi from 'joi';
import { LinkParams } from '@/services/link-service';

export const linkSchema = Joi.object<LinkParams>({
  name: Joi.string().required()
});