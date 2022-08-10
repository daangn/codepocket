import { pushCodeRequestValidate, PushCodeResponse } from '@codepocket/schema';
import { CodeInfo, CodeName, PocketToken, PushCodeParams } from 'types';

import { postMessageToSlack, SlackConfig, uploadCodeToSlack } from './slack';

interface PushCodeType<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: PushCodeResponse) => Response;
  slackConfig?: SlackConfig;
  getAuthorName: ({ pocketToken }: PocketToken) => Promise<string>;
  checkAnonymousCode: (params: CodeName) => Promise<void>;
  isExistCode: ({ codeName, codeAuthor }: CodeInfo) => Promise<boolean>;
  pushCode: (obj: PushCodeParams) => Promise<void>;
}

export default async <T, Response>(request: T, modules: PushCodeType<Response>) => {
  if (!pushCodeRequestValidate(request)) throw modules.validateErrorFunc();
  const { pocketToken, codeName, code, isAnonymous } = request.body;

  const codeAuthor = await modules.getAuthorName({ pocketToken });

  if (isAnonymous) await modules.checkAnonymousCode({ codeName });

  const isAlreadyPushedCode = await modules.isExistCode({ codeName, codeAuthor });

  const slackInfo = modules.slackConfig
    ? await uploadCodeToSlack({
        code,
        codeName,
        codeAuthor,
        isAnonymous,
        isAlreadyPushedCode,
        config: modules.slackConfig,
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

  if (modules.slackConfig)
    await postMessageToSlack({
      codeName,
      codeAuthor,
      isAnonymous,
      isAlreadyPushedCode,
      config: modules.slackConfig,
      uploadedChatURL: slackInfo.uploadedChatURL,
    });

  return modules.successResponseFunc({ message: '' });
};
