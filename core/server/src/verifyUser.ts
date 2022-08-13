import { verifyUserRequestValidate, VerifyUserResponse } from '@codepocket/schema';
import { PocketToken } from 'types';

export interface VerifyUserType<Response> {
  /* validator에러 */
  validateError?: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: VerifyUserResponse) => Response;

  /* 유저 이름을 가져오는 함수 */
  getUserName: ({ pocketToken }: PocketToken) => Promise<string>;
}

export default async <T, Response>(request: T, modules: VerifyUserType<Response>) => {
  if (!verifyUserRequestValidate(request)) throw modules.validateError;
  const { pocketToken } = request.body;

  const userName = await modules.getUserName({ pocketToken });

  return modules.successResponseFunc({ validUser: true, userName, message: '' });
};
