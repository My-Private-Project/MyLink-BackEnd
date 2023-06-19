import { Router } from 'express';

import { authenticateToken, validateBody, validateParams } from '@/middlewares';
import { bodyGet, bodyPut, cardDelete, cardPost, cardPut } from '@/controllers';
import { cardDeleteSchema, cardSchema, cardUpdateSchema } from '@/schemas/card-schemas';
import { bodySchema, bodyUpdateSchema, linkSchema } from '@/schemas';

const creatorRouter = Router();

creatorRouter
    .all('/*', authenticateToken)
    .get('/:name', validateParams(linkSchema), bodyGet)
    .put('/:id', validateParams(bodySchema), validateBody(bodyUpdateSchema), bodyPut)
    .post('/', validateBody(cardSchema), cardPost)
    .put('/', validateBody(cardUpdateSchema),cardPut)
    .delete('/:id', validateParams(cardDeleteSchema),cardDelete);

export { creatorRouter };