import { ApplicationError } from '@/protocols';

export function duplicatedEmailError(): ApplicationError {
  return {
    name: 'DuplicatedEmailError',
    message: 'There is already an user with given email',
  };
}

export function duplicatedNameError(): ApplicationError {
  return {
    name: 'DuplicatedNameError',
    message: 'There is already an user with given name',
  };
}
