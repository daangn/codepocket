import { createUserRequestValidate, CreateUserResponse } from '@codepocket/schema';
import { PocketToken, UserInfo } from 'types';

export interface CreateUserType<Response> {
  /* validator에러 */
  validateErrorFunc?: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: CreateUserResponse) => Response;

  /* 유저가 존재하면 토큰을 가져오는 함수 */
  getUsetToken: (params: UserInfo) => Promise<PocketToken | null>;
  /* 유저 생성 함수 */
  createUser: (params: UserInfo) => Promise<PocketToken>;
}

export default async <T, Response>(request: T, modules: CreateUserType<Response>) => {
  if (!createUserRequestValidate(request)) throw modules.validateErrorFunc;
  const { userName, email } = request.body;

  let token = await modules.getUsetToken({ userName, email });
  if (!token) token = await modules.createUser({ userName, email });

  return modules.successResponseFunc({ message: '', pocketToken: token.pocketToken });
};
