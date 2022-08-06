import { createUserRequestValidate, CreateUserResponse } from '@pocket/schema';
import stringHash from 'string-hash';
import { UserInfo, UserInfoWithToken } from 'types';

interface CreateUserType<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: CreateUserResponse) => Response;
  checkExistUser: (params: UserInfo) => Promise<boolean>;
  createUser: (params: UserInfoWithToken) => Promise<void>;
}

export default async <T, Response>(request: T, modules: CreateUserType<Response>) => {
  if (!createUserRequestValidate(request)) throw modules.validateErrorFunc();
  const { userName, email } = request.body;

  const pocketToken = String(stringHash(userName));

  const isExistUser = await modules.checkExistUser({ userName, email });
  if (!isExistUser) await modules.createUser({ userName, email, pocketToken });

  return modules.successResponseFunc({ message: '', pocketToken });
};
