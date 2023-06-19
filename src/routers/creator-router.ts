import { Router } from 'express';

import { authenticateToken, validateBody, validateParams } from '@/middlewares';
import { bodyGet, cardDelete, cardPost, cardPut } from '@/controllers';
import { cardDeleteSchema, cardSchema, cardUpdateSchema } from '@/schemas/card-schemas';

const creatorRouter = Router();

creatorRouter
    .all('/*', authenticateToken)
    .get('/:name', bodyGet)
    .post('/', validateBody(cardSchema), cardPost)
    .put('/', validateBody(cardUpdateSchema),cardPut)
    .delete('/:id', validateParams(cardDeleteSchema),cardDelete);

export { creatorRouter };