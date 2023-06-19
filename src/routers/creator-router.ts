import { Router } from 'express';

import { authenticateToken, validateBody, validateParams } from '@/middlewares';
import { bodyGet, cardDelete, cardPost, cardPut } from '@/controllers';

const creatorRouter = Router();

creatorRouter
    .all('/*', authenticateToken)
    .get('/', bodyGet)
    .post('/', validateBody(cardSchema), cardPost)
    .put('/', validateBody(cardUpdateSchema),cardPut)
    .delete('/:id', validateParams(cardDeleteSchema),cardDelete);

export { creatorRouter };