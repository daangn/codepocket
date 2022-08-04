import { to } from 'await-to-js';
import { FastifyInstance } from 'fastify';

import { IsExistCodeParams, PushCodeParams } from '../connectDB/pushCode';
import { CustomResponse } from '../utils/responseHandler';

export const findCode =
  (server: FastifyInstance) => async (codeName: string, codeAuthor: string) => {
    const [codeFindOneError, code] = await to(
      (async () =>
        await server.store.Code.findOne({
          codeName,
          codeAuthor,
        }))(),
    );

    if (codeFindOneError) throw new CustomResponse({ customStatus: 5000 });
    return code;
  };

export const isExistCode =
  (server: FastifyInstance) =>
  async ({ codeName, codeAuthor }: IsExistCodeParams) => {
    const codeInDB = await findCode(server)(codeName, codeAuthor);
    return !!codeInDB?.code || codeInDB?.code === '';
  };

export const pushCode =
  (server: FastifyInstance) =>
  async ({
    code,
    codeName,
    codeAuthor,
    isAlreadyPushedCode,
    slackChatChannel,
    slackChatTimeStamp,
  }: PushCodeParams) => {
    const [pushCodeError] = await to(
      isAlreadyPushedCode
        ? (async () =>
            await server.store.Code.findOneAndUpdate(
              {
                codeAuthor,
                codeName,
              },
              {
                code,
                uploadedChatChannel: slackChatChannel,
                uploadedChatTimeStamp: slackChatTimeStamp,
                updatedAt: new Date(),
              },
            ))()
        : (async () =>
            await server.store.Code.create({
              code,
              codeName,
              codeAuthor,
              uploadedChatChannel: slackChatChannel,
              uploadedChatTimeStamp: slackChatTimeStamp,
              createdAt: new Date(),
              updatedAt: new Date(),
            }))(),
    );

    if (pushCodeError) throw new CustomResponse({ customStatus: 5000 });
  };
