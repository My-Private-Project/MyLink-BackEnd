import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { duplicatedEmailError, duplicatedNameError } from './errors';
import userRepository from '@/repositories/user-repository';

export async function createUser({ email, password, name }: CreateUserParams): Promise<User> {
  await validateUniqueEmailOrFail(email);
  await validateUniqueNameOrFail(name);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    name,
    email,
    password: hashedPassword
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function validateUniqueNameOrFail(name: string) {
  const userWithSameName = await userRepository.findByName(name);
  if (userWithSameName) {
    throw duplicatedNameError();
  }
}

export type CreateUserParams = Pick<User, 'email' | 'password' | 'name'>;

const signUpService = {
  createUser,
};

export * from './errors';
export default signUpService;
