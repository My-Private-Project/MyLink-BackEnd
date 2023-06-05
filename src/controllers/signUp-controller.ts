import { Request, Response } from 'express';
import httpStatus from 'http-status';
import signUpService from '@/services/signUp-service';

export async function signUpPost(req: Request, res: Response) {
  const { email, password, name } = req.body;

  try {
    const user = await signUpService.createUser({ email, password, name });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.name === 'DuplicatedEmailError') {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
