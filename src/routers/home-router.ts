import { Router } from 'express';

import { authenticateToken, validateBody } from '@/middlewares';
import { linkSchema } from '@/schemas/link-schemas';
import { linkGet, linkPost } from '@/controllers/link-controller';

const homeRouter = Router();

homeRouter
    .all('/*', authenticateToken)
    .get('/', linkGet)
    .post('/', validateBody(linkSchema), linkPost);

export { homeRouter };