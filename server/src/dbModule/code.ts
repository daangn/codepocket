import { to } from 'await-to-js';
import { FastifyInstance } from 'fastify';

import { DeleteCodeParams } from '../connectDB/deleteCode';
import { FindCodeInfoUsingRegexParams } from '../connectDB/getCodeNames';
import { GetCodeParams } from '../connectDB/pullCode';
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
    if (!code) throw new CustomResponse({ customStatus: 4003 });

    return code;
  };

export const findCodeInfoUsingRegex =
  (server: FastifyInstance) =>
  async ({ codeAuthorRegex, codeNameRegex }: FindCodeInfoUsingRegexParams) => {
    const [error, codes] = await to(
      (async () =>
        await server.store.Code.find({ codeName: codeNameRegex, codeAuthor: codeAuthorRegex }).sort(
          {
            updatedAt: 'desc',
          },
        ))(),
    );

    if (error) throw new CustomResponse({ customStatus: 5000 });

    // TODO: reduce 사용해서 한 번으로 뽑아내기
    const codeNames = codes.map(({ codeName }) => codeName); // eslint-disable-line no-shadow
    const codeAuthors = codes.map(({ codeAuthor }) => codeAuthor); // eslint-disable-line no-shadow
    return { codeNames, codeAuthors };
  };

export const isExistCode =
  (server: FastifyInstance) =>
  async ({ codeName, codeAuthor }: IsExistCodeParams) => {
    const codeInDB = await findCode(server)(codeName, codeAuthor);
    return !!codeInDB?.code || codeInDB?.code === '';
  };

export const getCodeCode =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName }: GetCodeParams) => {
    const code = await findCode(server)(codeName, codeAuthor);
    return code.code;
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

export const deleteCode =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName }: DeleteCodeParams) => {
    const [deleteCodeError, deleteCodeResponse] = await to(
      (async () => await server.store.Code.deleteOne({ codeAuthor, codeName }))(),
    );

    if (deleteCodeError) throw new CustomResponse({ customStatus: 5000 });
    if (!deleteCodeResponse.deletedCount) throw new CustomResponse({ customStatus: 4006 });
  };
