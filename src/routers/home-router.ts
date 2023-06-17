import { Router } from 'express';

import { authenticateToken, validateBody, validateParams } from '@/middlewares';
import { linkDeleteSchema, linkSchema, linkUpdateSchema } from '@/schemas/link-schemas';
import { linkDelete, linkGet, linkPost, linkPut } from '@/controllers/link-controller';

const homeRouter = Router();

homeRouter
    .all('/*', authenticateToken)
    .get('/', linkGet)
    .post('/', validateBody(linkSchema), linkPost)
    .put('/', validateBody(linkUpdateSchema),linkPut)
    .delete('/:id', validateParams(linkDeleteSchema),linkDelete);

export { homeRouter };