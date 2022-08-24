import { pushCodeRequestValidate, PushCodeResponse } from '@codepocket/schema';
import { CodeInfo, CodeName, PocketToken, PushCodeParams, UserNameWithId } from 'types';

import { postMessageToSlack, SlackConfig, uploadCodeToSlack } from './slack';

export interface PushCodeType<Response> {
  /* validator에러 */
  validateError?: Response;
  /* 슬랙 통신이 잘못되었을 경우 에러 */
  slackAPIError?: Response;
  /* 익명으로 된 동일한 이름의 코드가 있으면 에러 */
  existAnonymousError: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: PushCodeResponse) => Response;

  /* slack 키 값들 */
  slackConfig?: SlackConfig;

  /* 유저이름 가져오는 함수 */
  getUserInfo: (params: PocketToken) => Promise<UserNameWithId>;
  /* 익명으로 된 동일한 이름의 코드가 있는지 검사하는 함수  */
  isAnonymousCodeExist: (params: CodeName) => Promise<boolean>;
  /* 코드가 존재하는지 확인하는 함수 */
  isExistCode: (paramsshel: CodeInfo) => Promise<boolean>;
  /* 코드를 생성하는 함수 */
  pushCode: (obj: PushCodeParams) => Promise<PushCodeParams>;
}

export default async <T, Response>(request: T, modules: PushCodeType<Response>) => {
  if (!pushCodeRequestValidate(request)) throw modules.validateError;
  const { pocketToken, codeName, code, isAnonymous } = request.body;

  const { userName: codeAuthor, userId } = await modules.getUserInfo({ pocketToken });

  if (isAnonymous) {
    const exist = await modules.isAnonymousCodeExist({ codeName });
    if (exist) throw modules.existAnonymousError;
  }

  const isAlreadyPushedCode = await modules.isExistCode({ codeName, codeAuthor });

  const slackInfo =
    modules.slackConfig && modules.slackAPIError
      ? await uploadCodeToSlack({
          code,
          codeName,
          codeAuthor,
          isAnonymous,
          isAlreadyPushedCode,
          config: modules.slackConfig,
          UploadCodeError: modules.slackAPIError,
        })
      : {
          uploadedChatChannel: undefined,
          uploadedChatTimeStamp: undefined,
          uploadedChatURL: undefined,
        };

  const { id: codeId } = await modules.pushCode({
    code,
    codeName,
    codeAuthor,
    userId,
    isAnonymous,
    isAlreadyPushedCode,
    slackChatChannel: slackInfo.uploadedChatChannel,
    slackChatTimeStamp: slackInfo.uploadedChatTimeStamp,
  });

  if (modules.slackConfig && modules.slackAPIError)
    await postMessageToSlack({
      codeId: codeId || '',
      codeName,
      codeAuthor,
      isAnonymous,
      isAlreadyPushedCode,
      config: modules.slackConfig,
      uploadedChatURL: slackInfo.uploadedChatURL,
      PostMessageError: modules.slackAPIError,
    });

  return modules.successResponseFunc({ message: '' });
};
