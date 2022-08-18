import { createUserRequestValidate, CreateUserResponse } from '@codepocket/schema';
import { UserInfo, UserPrivateInfo } from 'types';

export interface CreateUserType<Response> {
  /* validator에러 */
  validateError?: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: CreateUserResponse) => Response;

  /* 유저가 존재하면 토큰과 ID를 가져오는 함수 */
  getUserPrivateInfo: (params: UserInfo) => Promise<UserPrivateInfo | null>;
  /* 유저 생성 함수 */
  createUser: (params: UserInfo) => Promise<UserPrivateInfo>;
}

export default async <T, Response>(request: T, modules: CreateUserType<Response>) => {
  if (!createUserRequestValidate(request)) throw modules.validateError;
  const { userName, email } = request.body;

  let privateInfo = await modules.getUserPrivateInfo({ userName, email });
  if (!privateInfo) privateInfo = await modules.createUser({ userName, email });

  return modules.successResponseFunc({
    message: '',
    pocketToken: privateInfo.pocketToken,
    userId: privateInfo.userId,
  });
};
