/* eslint-disable no-underscore-dangle */
import { DeleteCodeRequest, DeleteCodeResponse } from '@pocket/schema';
import to from 'await-to-js';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { postMessageToSlack } from '../api/postMessageToSlack';
import { env } from '../utils/env';
import { CustomResponse } from '../utils/responseHandler';

export default async (server: FastifyInstance, request: FastifyRequest) => {
  const {
    body: { pocketToken, codeName },
  } = request as DeleteCodeRequest;

  if (!pocketToken) throw new CustomResponse({ customStatus: 4000 });
  if (!codeName) throw new CustomResponse({ customStatus: 4005 });

  const [findAuthorError, findAuthorResponse] = await to(
    (async () => await server.store.User.findOne({ token: pocketToken }))(),
  );

  if (findAuthorError) throw new CustomResponse({ customStatus: 5000 });
  if (!findAuthorResponse) throw new CustomResponse({ customStatus: 4000 });

  const { userName: codeAuthor } = findAuthorResponse;

  const [existsCodeError, existsCodeResponse] = await to(
    (async () => await server.store.Code.exists({ codeAuthor, codeName }))(),
  );

  if (existsCodeError) throw new CustomResponse({ customStatus: 5000 });
  if (!existsCodeResponse) throw new CustomResponse({ customStatus: 4006 });

  const [deleteCodeError, deleteCodeResponse] = await to(
    (async () => await server.store.Code.deleteOne({ codeAuthor, codeName }))(),
  );

  if (deleteCodeError) throw new CustomResponse({ customStatus: 5000 });
  if (!deleteCodeResponse.deletedCount) throw new CustomResponse({ customStatus: 4006 });

  const [postMessageError] = await to(
    postMessageToSlack({
      slackBotToken: env.SLACK_BOT_TOKEN || '',
      channelId: existsCodeResponse._id?.uploadedChatChannel || '',
      threadTs: existsCodeResponse._id?.uploadedChatTimeStamp || '',
      text: `\`${codeAuthor}\`의 \`${codeName}\` 코드가 삭제되었어요!`,
    }),
  );

  if (postMessageError) throw new CustomResponse({ customStatus: 5001 });

  return new CustomResponse<DeleteCodeResponse>({ customStatus: 2002 });
};
