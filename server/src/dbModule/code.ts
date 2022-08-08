import { Types } from '@pocket/core-server';
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
    if (!code) throw new CustomResponse({ customStatus: 4003 });

    return code;
  };

export const findCodeInfoUsingRegex =
  (server: FastifyInstance) =>
  async ({
    codeAuthorRegex,
    codeNameRegex,
    isCodeAuthorExist,
  }: Types.FindCodeInfoUsingRegexParams) => {
    const [error, codes] = await to(
      (async () =>
        await server.store.Code.find({ codeName: codeNameRegex, codeAuthor: codeAuthorRegex }).sort(
          {
            updatedAt: 'desc',
          },
        ))(),
    );

    if (error) throw new CustomResponse({ customStatus: 5000 });
    const codeInfos = codes
      .map((code) => ({
        codeName: code.codeName,
        codeAuthor: code.codeAuthor,
        isAnonymous: code.isAnonymous,
      }))
      .filter((code) => !isCodeAuthorExist || !code.isAnonymous);

    return codeInfos;
  };

export const isExistCode =
  (server: FastifyInstance) =>
  async ({ codeName, codeAuthor }: Types.CodeInfo) => {
    const [codeFindOneError, codeInDB] = await to(
      (async () => await server.store.Code.findOne({ codeName, codeAuthor }))(),
    );

    if (codeFindOneError) throw new CustomResponse({ customStatus: 5000 });
    return !!codeInDB?.code || codeInDB?.code === '';
  };

export const getCodeCode =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName }: Types.CodeInfo) => {
    const code = await findCode(server)(codeName, codeAuthor);
    return code.code;
  };

export const pushCode =
  (server: FastifyInstance) =>
  async ({
    code,
    codeName,
    codeAuthor,
    isAnonymous,
    isAlreadyPushedCode,
    slackChatChannel,
    slackChatTimeStamp,
  }: Types.PushCodeParams) => {
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
                isAnonymous,
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
              isAnonymous,
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
  async ({ codeAuthor, codeName }: Types.CodeInfo) => {
    const [deleteCodeError, deleteCodeResponse] = await to(
      (async () => await server.store.Code.deleteOne({ codeAuthor, codeName }))(),
    );

    if (deleteCodeError) throw new CustomResponse({ customStatus: 5000 });
    if (!deleteCodeResponse.deletedCount) throw new CustomResponse({ customStatus: 4006 });
  };

export const searchCodes =
  (server: FastifyInstance) =>
  async ({ searchRegex, limit, offset }: Types.SearchCodesParam) => {
    const [error, getCodes] = await to(
      (async () =>
        await server.store.Code.find()
          .or([{ codeName: searchRegex }, { codeAuthor: searchRegex }])
          .sort({ updatedAt: 'desc' })
          .skip(+limit * +offset)
          .limit(+limit))(),
    );

    if (error) throw new CustomResponse({ customStatus: 5000 });

    const codes = getCodes.map(
      ({ code, codeName, codeAuthor, createdAt, updatedAt, isAnonymous }) => ({
        code,
        codeName,
        codeAuthor,
        createdAt,
        updatedAt,
        isAnonymous,
      }),
    );

    return codes;
  };
