import { pushCodeRequestValidate, PushCodeResponse } from '@pocket/schema';

import * as SlackModule from '../dbModule/slack';

export interface PushCodeParams {
  code: string;
  codeName: string;
  codeAuthor: string;
  isAlreadyPushedCode: boolean;
  slackChatChannel?: string;
  slackChatTimeStamp?: any;
}

export interface GetAuthorNameParams {
  pocketToken: string;
}

export interface IsExistCodeParams {
  codeName: string;
  codeAuthor: string;
}

interface PushCodeType<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: PushCodeResponse) => Response;
  slackIsAvailable: boolean;
  getAuthorName: ({ pocketToken }: GetAuthorNameParams) => Promise<string>;
  isExistCode: ({ codeName, codeAuthor }: IsExistCodeParams) => Promise<boolean>;
  pushCode: (obj: PushCodeParams) => Promise<void>;
}

export default async <T, Response>(request: T, modules: PushCodeType<Response>) => {
  if (!pushCodeRequestValidate(request)) throw modules.validateErrorFunc();
  const { pocketToken, codeName, code } = request.body;

  const codeAuthor = await modules.getAuthorName({ pocketToken });

  const isAlreadyPushedCode = await modules.isExistCode({ codeName, codeAuthor });

  const slackInfo = SlackModule.isSlackAvailable
    ? await SlackModule.uploadCodeToSlack(code, codeName, codeAuthor, isAlreadyPushedCode)
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

  await SlackModule.uploadCodeToSlack(code, codeName, codeAuthor, isAlreadyPushedCode);

  return modules.successResponseFunc({ message: '' });
};
