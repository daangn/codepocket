import { verifyUserRequestValidate, VerifyUserResponse } from '@codepocket/schema';
import { PocketToken } from 'types';

interface VerifyUserType<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: VerifyUserResponse) => Response;
  getUserName: ({ pocketToken }: PocketToken) => Promise<string>;
}

export default async <T, Response>(request: T, modules: VerifyUserType<Response>) => {
  if (!verifyUserRequestValidate(request)) throw modules.validateErrorFunc();
  const { pocketToken } = request.body;

  const userName = await modules.getUserName({ pocketToken });

  return modules.successResponseFunc({ validUser: true, userName, message: '' });
};
