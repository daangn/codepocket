import { createUserRequestValidate, CreateUserResponse } from '@codepocket/schema';
import { PocketToken, UserInfo } from 'types';

interface CreateUserType<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: CreateUserResponse) => Response;
  checkExistUser: (params: UserInfo) => Promise<PocketToken | null>;
  createUser: (params: UserInfo) => Promise<PocketToken>;
}

export default async <T, Response>(request: T, modules: CreateUserType<Response>) => {
  if (!createUserRequestValidate(request)) throw modules.validateErrorFunc();
  const { userName, email } = request.body;

  let token = await modules.checkExistUser({ userName, email });
  if (!token) token = await modules.createUser({ userName, email });

  return modules.successResponseFunc({ message: '', pocketToken: token.pocketToken });
};
