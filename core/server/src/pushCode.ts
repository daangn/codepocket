import { pushCodeRequestValidate, PushCodeResponse } from '@pocket/schema';
import { CodeInfo, PocketToken, PushCodeParams } from 'types';

import { SlackConfig, uploadCodeToSlack } from './slack';

interface PushCodeType<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: PushCodeResponse) => Response;
  slackConfig?: SlackConfig;
  getAuthorName: ({ pocketToken }: PocketToken) => Promise<string>;
  isExistCode: ({ codeName, codeAuthor }: CodeInfo) => Promise<boolean>;
  pushCode: (obj: PushCodeParams) => Promise<void>;
}

export default async <T, Response>(request: T, modules: PushCodeType<Response>) => {
  if (!pushCodeRequestValidate(request)) throw modules.validateErrorFunc();
  const { pocketToken, codeName, code } = request.body;

  const codeAuthor = await modules.getAuthorName({ pocketToken });

  const isAlreadyPushedCode = await modules.isExistCode({ codeName, codeAuthor });

  const slackInfo = modules.slackConfig
    ? await uploadCodeToSlack({
        code,
        codeName,
        codeAuthor,
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
    isAlreadyPushedCode,
    slackChatChannel: slackInfo.uploadedChatChannel,
    slackChatTimeStamp: slackInfo.uploadedChatTimeStamp,
  });

  if (modules.slackConfig)
    await uploadCodeToSlack({
      code,
      codeName,
      codeAuthor,
      isAlreadyPushedCode,
      config: modules.slackConfig,
    });

  return modules.successResponseFunc({ message: '' });
};