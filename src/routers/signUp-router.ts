import { Router } from 'express';

import { createUserSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { signUpPost } from '@/controllers';

const signUpRouter = Router();

signUpRouter.post('/', validateBody(createUserSchema), signUpPost);

export { signUpRouter };
