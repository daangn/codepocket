import { deleteCodeByIdRequestValidate, DeleteCodeResponse } from '@codepocket/schema';
import { SlackConfig } from 'slack';
// import { deleteMessageToSlack } from 'slack';
import { CodeAuthorWithId, CodeId, PocketToken, UserNameWithId } from 'types';

export interface DeleteCodeByIdType<Response> {
  /* validator에러 */
  validateError?: Response;
  /* 코드가 존재하지 않을 경우 에러 */
  existCodeErrorFunc: () => Response;
  /* 슬랙 통신이 잘못되었을 경우 에러 */
  slackAPIError?: () => Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: DeleteCodeResponse) => Response;

  slackConfig?: SlackConfig;
  /* 유저 이름을 가져오는 함수 */
  getUserInfo: (params: PocketToken) => Promise<UserNameWithId>;
  /* 존재하는 코드인지 확인하는 함수 */
  isExistCode: (params: CodeAuthorWithId) => Promise<boolean>;
  /* 코드를 삭제하는 함수 */
  deleteCodeById: (params: CodeId) => Promise<void>;
}

export default async <T, Response>(request: T, modules: DeleteCodeByIdType<Response>) => {
  if (!deleteCodeByIdRequestValidate(request)) throw modules.validateError;
  const { pocketToken, codeId } = request.body;

  const { userName: codeAuthor } = await modules.getUserInfo({ pocketToken });
  const existCode = await modules.isExistCode({ codeId, codeAuthor });
  if (!existCode) throw modules.existCodeErrorFunc();

  await modules.deleteCodeById({ codeId });

  if (modules.slackConfig) {
    // deleteMessageToSlack();
  }

  return modules.successResponseFunc({ message: '' });
};
