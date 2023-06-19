import { ApplicationError } from '@/protocols';

export function duplicatedNameError(): ApplicationError {
  return {
    name: 'DuplicatedNameError',
    message: 'There is already at card with given name',
  };
}