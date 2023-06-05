import { Router } from 'express';

import { singInPost } from '@/controllers';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas';

const signInRouter = Router();

signInRouter.post('/', validateBody(signInSchema), singInPost);

export { signInRouter };
