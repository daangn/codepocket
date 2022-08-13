import { pushCodeRequestValidate, PushCodeResponse } from '@codepocket/schema';
import { CodeInfo, CodeName, PocketToken, PushCodeParams } from 'types';

import { postMessageToSlack, SlackConfig, uploadCodeToSlack } from './slack';

export interface PushCodeType<Response> {
  /* validator에러 */
  validateErrorFunc?: Response;
  /* 슬랙 통신이 잘못되었을 경우 에러 */
  slackAPIError?: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: PushCodeResponse) => Response;

  /* slack 키 값들 */
  slackConfig?: SlackConfig;

  getAuthorName: (params: PocketToken) => Promise<string>;
  checkAnonymousCode: (params: CodeName) => Promise<void>;
  isExistCode: (paramsshel: CodeInfo) => Promise<boolean>;
  pushCode: (obj: PushCodeParams) => Promise<void>;
}

export default async <T, Response>(request: T, modules: PushCodeType<Response>) => {
  if (!pushCodeRequestValidate(request)) throw modules.validateErrorFunc;
  const { pocketToken, codeName, code, isAnonymous } = request.body;

  const codeAuthor = await modules.getAuthorName({ pocketToken });

  if (isAnonymous) await modules.checkAnonymousCode({ codeName });

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

  await modules.pushCode({
    code,
    codeName,
    codeAuthor,
    isAnonymous,
    isAlreadyPushedCode,
    slackChatChannel: slackInfo.uploadedChatChannel,
    slackChatTimeStamp: slackInfo.uploadedChatTimeStamp,
  });

  if (modules.slackConfig && modules.slackAPIError)
    await postMessageToSlack({
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
