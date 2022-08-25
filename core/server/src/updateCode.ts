import { updateCodeRequestValidate, UpdateCodeResponse } from '@codepocket/schema';
import { CodeId, PocketToken, UpdateCodeParams, UserNameWithId } from 'types';

import { postMessageToSlack, SlackConfig, uploadCodeToSlack } from './slack';

export interface UpdateCodeType<Response> {
  /* validator에러 */
  validateError?: Response;
  /* 슬랙 통신이 잘못되었을 경우 에러 */
  slackAPIError?: Response;
  /* 수정하고자 하는 코드가 없으면 에러 */
  notExistCodeError?: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: UpdateCodeResponse) => Response;

  /* slack 키 값들 */
  slackConfig?: SlackConfig;

  /* 유저이름 가져오는 함수 */
  getUserInfo: (params: PocketToken) => Promise<UserNameWithId>;
  /* 해당 저자의 동일한 이름의 코드가 있는 검사하는 함수 */
  checkExistCodeWithCodeId: (params: CodeId) => Promise<boolean>;
  /* 코드를 생성하는 함수 */
  updateCode: (obj: UpdateCodeParams) => Promise<void>;
}

export default async <T, Response>(request: T, modules: UpdateCodeType<Response>) => {
  if (!updateCodeRequestValidate(request)) throw modules.validateError;
  const { pocketToken, codeName, code, isAnonymous, codeId } = request.body;

  const { userName: codeAuthor, userId } = await modules.getUserInfo({ pocketToken });

  const isExistCode = await modules.checkExistCodeWithCodeId({ codeId });
  if (!isExistCode) throw modules.notExistCodeError;

  const slackInfo =
    modules.slackConfig && modules.slackAPIError
      ? await uploadCodeToSlack({
          code,
          codeName,
          codeAuthor,
          isAnonymous,
          isAlreadyPushedCode: true,
          config: modules.slackConfig,
          UploadCodeError: modules.slackAPIError,
        })
      : {
          uploadedChatChannel: undefined,
          uploadedChatTimeStamp: undefined,
          uploadedChatURL: undefined,
        };

  await modules.updateCode({
    code,
    codeId,
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
      isAlreadyPushedCode: true,
      config: modules.slackConfig,
      uploadedChatURL: slackInfo.uploadedChatURL,
      PostMessageError: modules.slackAPIError,
    });

  return modules.successResponseFunc({ message: '' });
};
