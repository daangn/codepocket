import { deleteCodeRequestValidate, DeleteCodeResponse } from '@codepocket/schema';
// import { deleteMessageToSlack } from 'slack';
import { CodeInfo, PocketToken } from 'types';

export interface DeleteCodeType<Response> {
  /* validator에러 */
  validateErrorFunc?: Response;
  /* 코드가 존재하지 않을 경우 에러 */
  existCodeErrorFunc: () => Response;
  /* 슬랙 통신이 잘못되었을 경우 에러 */
  slackAPIError?: () => Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: DeleteCodeResponse) => Response;

  slackBotToken?: string;
  /* 유저 이름을 가져오는 함수 */
  getUserName: (params: PocketToken) => Promise<string>;
  /* 존재하는 코드인지 확인하는 함수 */
  getCodeInfo: (params: CodeInfo) => Promise<boolean>;
  /* 코드를 삭제하는 함수 */
  deleteCode: (params: CodeInfo) => Promise<void>;
}

export default async <T, Response>(request: T, modules: DeleteCodeType<Response>) => {
  if (!deleteCodeRequestValidate(request)) throw modules.validateErrorFunc;
  const { pocketToken, codeName } = request.body;

  const codeAuthor = await modules.getUserName({ pocketToken });
  const existCode = await modules.getCodeInfo({ codeAuthor, codeName });
  if (!existCode) throw modules.existCodeErrorFunc();

  await modules.deleteCode({ codeAuthor, codeName });

  if (modules.slackBotToken) {
    // deleteMessageToSlack();
  }

  return modules.successResponseFunc({ message: '' });
};
