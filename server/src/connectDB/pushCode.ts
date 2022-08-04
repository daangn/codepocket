import { pushCodeRequestValidate, PushCodeResponse } from '@pocket/schema';
import { FastifyInstance } from 'fastify';

import * as CodeModule from '../dbModule/code';
import * as SlackModule from '../dbModule/slack';
import * as UserModule from '../dbModule/user';
import { CustomResponse } from '../utils/responseHandler';

export default async <T>(server: FastifyInstance, request: T) => {
  if (!pushCodeRequestValidate(request)) throw new CustomResponse({ customStatus: 4000 });
  const { pocketToken, codeName, code } = request.body;

  const author = await UserModule.findAuthor(server)(pocketToken);

  const { userName: codeAuthor } = author;

  const isAlreadyPushedCode = await CodeModule.isExistCode(server)(codeName, codeAuthor);

  const slackInfo = SlackModule.isSlackAvailable
    ? await SlackModule.uploadCodeToSlack(code, codeName, codeAuthor, isAlreadyPushedCode)
    : {
        uploadedChatChannel: undefined,
        uploadedChatTimeStamp: undefined,
        uploadedChatURL: undefined,
      };

  await CodeModule.pushCode(server)(
    isAlreadyPushedCode,
    codeAuthor,
    codeName,
    code,
    slackInfo.uploadedChatChannel,
    slackInfo.uploadedChatTimeStamp,
  );

  await SlackModule.uploadCodeToSlack(code, codeName, codeAuthor, isAlreadyPushedCode);

  return new CustomResponse<PushCodeResponse>({ customStatus: isAlreadyPushedCode ? 2006 : 2005 });
};
