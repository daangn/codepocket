import { pushCodeRequestValidate, PushCodeResponse, UploadSlackFileResponse } from '@pocket/schema';
import to from 'await-to-js';
import { FastifyInstance } from 'fastify';

import { postMessageToSlack } from '../api/postMessageToSlack';
import { uploadCodeToSlack } from '../api/uploadCodeToSlack';
import { env } from '../utils/env';
import { CustomResponse } from '../utils/responseHandler';
import { changeFirstToUpperCase } from '../utils/string';

export default async <T>(server: FastifyInstance, request: T) => {
  if (!pushCodeRequestValidate(request)) throw new CustomResponse({ customStatus: 4000 });
  const { pocketToken, codeName, code } = request.body;

  const [findAuthorError, findAuthorResponse] = await to(
    (async () => await server.store.User.findOne({ token: pocketToken }))(),
  );

  if (findAuthorError) throw new CustomResponse({ customStatus: 5000 });
  if (!findAuthorResponse) throw new CustomResponse({ customStatus: 4000 });

  const { userName: codeAuthor } = findAuthorResponse;

  const [codeFindOneError, codeFindOneResponse] = await to(
    (async () =>
      await server.store.Code.findOne({
        codeName,
        codeAuthor,
      }))(),
  );

  if (codeFindOneError) throw new CustomResponse({ customStatus: 5000 });

  const isAlreadyPushed = !!codeFindOneResponse?.code || codeFindOneResponse?.code === '';

  const [uploadCodeError, uploadCodeResponse] = await to(
    uploadCodeToSlack({
      code,
      codeName,
      initialComment: `\`${changeFirstToUpperCase(codeAuthor)}\`의 \`${codeName}\` 코드가 ${
        isAlreadyPushed ? '수정됐어요!' : '올라왔어요!'
      }`,
      slackBotToken: env.SLACK_BOT_TOKEN || '',
      channelId: env.CODEPOCKET_CHANNEL_ID || '',
    }),
  );

  if (uploadCodeError || !uploadCodeResponse.response)
    throw new CustomResponse({ customStatus: 5001 });

  const {
    file: {
      channels,
      shares: { public: publicResponse },
    },
  }: UploadSlackFileResponse = await uploadCodeResponse.response.json();

  const uploadedChatChannel = channels[0];
  const uploadedChatTimeStamp = (publicResponse as any)[uploadedChatChannel][0].ts;
  const uploadedChatURL = `https://daangn.slack.com/archives/${uploadedChatChannel}/${uploadedChatTimeStamp}`;

  const [pushCodeError] = await to(
    isAlreadyPushed
      ? (async () =>
          await server.store.Code.findOneAndUpdate(
            {
              codeAuthor,
              codeName,
            },
            {
              code,
              uploadedChatChannel,
              uploadedChatTimeStamp,
              updatedAt: new Date(),
            },
          ))()
      : (async () =>
          await server.store.Code.create({
            code,
            codeName,
            codeAuthor,
            uploadedChatChannel,
            uploadedChatTimeStamp,
            createdAt: new Date(),
            updatedAt: new Date(),
          }))(),
  );

  if (pushCodeError) throw new CustomResponse({ customStatus: 5000 });

  const [postMessageError] = await to(
    postMessageToSlack({
      slackBotToken: env.SLACK_BOT_TOKEN || '',
      channelId: env.CHAPTER_FRONTED_CHANNEL_ID || '',
      text: `\`${changeFirstToUpperCase(codeAuthor)}\`의 \`${codeName}\` 코드가 ${
        isAlreadyPushed ? '수정됐어요!' : '올라왔어요!'
      }\n${uploadedChatURL}`,
    }),
  );

  if (postMessageError) throw new CustomResponse({ customStatus: 5001 });

  return new CustomResponse<PushCodeResponse>({ customStatus: isAlreadyPushed ? 2006 : 2005 });
};
