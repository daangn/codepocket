import { createUserRequestValidate, CreateUserResponse } from '@pocket/schema';
import stringHash from 'string-hash';

export interface CheckExistUserParams {
  userName: string;
  email: string;
}

export interface CreateUserParams {
  userName: string;
  email: string;
  pocketToken: string;
}

interface CreateUserType<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: CreateUserResponse) => Response;
  checkExistUser: (params: CheckExistUserParams) => Promise<boolean>;
  createUser: (params: CreateUserParams) => Promise<void>;
}

export default async <T, Response>(request: T, modules: CreateUserType<Response>) => {
  if (!createUserRequestValidate(request)) throw modules.validateErrorFunc();
  const { userName, email } = request.body;

  const pocketToken = String(stringHash(userName));

  const isExistUser = await modules.checkExistUser({ userName, email });
  if (!isExistUser) await modules.createUser({ userName, email, pocketToken });

  return modules.successResponseFunc({ message: '', pocketToken });
};
