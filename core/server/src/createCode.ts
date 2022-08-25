import { createCodeRequestValidate, CreateCodeResponse } from '@codepocket/schema';
import { CodeId, CodeInfo, CreateCodeParams, PocketToken, UserNameWithId } from 'types';

import { postMessageToSlack, SlackConfig, uploadCodeToSlack } from './slack';

export interface CreateCodeType<Response> {
  /* validator에러 */
  validateError?: Response;
  /* 슬랙 통신이 잘못되었을 경우 에러 */
  slackAPIError?: Response;
  /* 자신이 작성한 것 중 동일한 이름의 코드가 있으면 에러 */
  existCodeNameError: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: CreateCodeResponse) => Response;

  /* slack 키 값들 */
  slackConfig?: SlackConfig;

  /* 유저이름 가져오는 함수 */
  getUserInfo: (params: PocketToken) => Promise<UserNameWithId>;
  /* 해당 저자의 동일한 이름의 코드가 있는 검사하는 함수 */
  isExistCodeName: (params: CodeInfo) => Promise<boolean>;
  /* 코드를 생성하는 함수 */
  createCode: (obj: CreateCodeParams) => Promise<CodeId>;
}

export default async <T, Response>(request: T, modules: CreateCodeType<Response>) => {
  if (!createCodeRequestValidate(request)) throw modules.validateError;
  const { pocketToken, codeName, code, isAnonymous } = request.body;

  const { userName: codeAuthor, userId } = await modules.getUserInfo({ pocketToken });

  const isExistCodeName = await modules.isExistCodeName({ codeAuthor, codeName });
  if (isExistCodeName) throw modules.existCodeNameError;

  const slackInfo =
    modules.slackConfig && modules.slackAPIError
      ? await uploadCodeToSlack({
          code,
          codeName,
          codeAuthor,
          isAnonymous,
          isAlreadyPushedCode: false,
          config: modules.slackConfig,
          UploadCodeError: modules.slackAPIError,
        })
      : {
          uploadedChatChannel: undefined,
          uploadedChatTimeStamp: undefined,
          uploadedChatURL: undefined,
        };

  const { codeId } = await modules.createCode({
    code,
    codeName,
    codeAuthor,
    userId,
    isAnonymous,
    slackChatChannel: slackInfo.uploadedChatChannel,
    slackChatTimeStamp: slackInfo.uploadedChatTimeStamp,
  });

  if (modules.slackConfig && modules.slackAPIError)
    await postMessageToSlack({
      codeId,
      codeName,
      codeAuthor,
      isAnonymous,
      isAlreadyPushedCode: false,
      config: modules.slackConfig,
      uploadedChatURL: slackInfo.uploadedChatURL,
      PostMessageError: modules.slackAPIError,
    });

  return modules.successResponseFunc({ message: '' });
};
