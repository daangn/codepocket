import { to } from 'await-to-js';
import { FastifyInstance } from 'fastify';

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
  (server: FastifyInstance) => async (codeName: string, codeAuthor: string) => {
    const codeInDB = await findCode(server)(codeName, codeAuthor);
    return !!codeInDB?.code || codeInDB?.code === '';
  };

export const pushCode =
  (server: FastifyInstance) =>
  async (
    isAlreadyPushedCode: boolean,
    codeAuthor: string,
    codeName: string,
    code: string,
    uploadedChatChannel?: string,
    uploadedChatTimeStamp?: any,
  ) => {
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
  };
