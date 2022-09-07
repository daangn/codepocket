import { Types } from '@codepocket/core-server';
import { CodeName } from '@codepocket/core-server/dist/types';
import { to } from 'await-to-js';
import { FastifyInstance } from 'fastify';

import { Code } from '../schema';
import { CustomResponse } from '../utils/responseHandler';

type CodeOptionalType = Partial<Code> & { codeId?: string };

const findOneCode = async (server: FastifyInstance, codeInfo: CodeOptionalType) => {
  const [codeFindOneError, code] = await to(
    (async () =>
      await server.store.Code.findOne({
        ...codeInfo,
      }))(),
  );

  if (codeFindOneError) throw new CustomResponse({ customStatus: 5000 });
  return code;
};

const findCodeById = async (server: FastifyInstance, codeId: string) => {
  const [findCodeByIdError, codeInfo] = await to(
    (async () => await server.store.Code.findById(codeId))(),
  );

  if (findCodeByIdError) throw new CustomResponse({ customStatus: 5000 });
  return codeInfo;
};

const findCode = async (server: FastifyInstance, codeInfo: CodeOptionalType) => {
  const [findCodeError, code] = await to(
    (async () => await server.store.Code.find({ ...codeInfo }))(),
  );

  if (findCodeError) throw new CustomResponse({ customStatus: 5000 });
  return code;
};

export const getCodeInfoById =
  (server: FastifyInstance) =>
  async ({ codeId }: Types.CodeId) => {
    const codeInfo = await findCodeById(server, codeId);
    if (!codeInfo) throw new CustomResponse({ customStatus: 4008 });

    const { codeAuthor, codeName, isAnonymous, code } = codeInfo;
    return { codeAuthor: isAnonymous ? '' : codeAuthor, codeName, isAnonymous, code };
  };

export const getAllCodeInfoById =
  (server: FastifyInstance) =>
  async ({ codeId }: Types.CodeId) => {
    const codeInfo = await findCodeById(server, codeId);
    if (!codeInfo) throw new CustomResponse({ customStatus: 4008 });

    const { codeAuthor, codeName } = codeInfo;
    return { codeAuthor, codeName };
  };

export const isExistCodeWithCodeId =
  (server: FastifyInstance) =>
  async ({ codeId }: Types.CodeId) => {
    const codeInfo = await findCodeById(server, codeId);
    if (!codeInfo) throw new CustomResponse({ customStatus: 4008 });

    return !!codeInfo;
  };

/**
 *
 */
export const findCodeAuthors =
  (server: FastifyInstance) =>
  async ({ codeName }: CodeName) => {
    const code = await findCode(server, { codeName });
    if (!code.length) throw new CustomResponse({ customStatus: 4007 });

    return code.map((code) => ({ codeAuthor: code.codeAuthor, isAnonymous: code.isAnonymous }));
  };

export const isExistCode =
  (server: FastifyInstance) =>
  async ({ codeName, codeAuthor }: Types.CodeInfo) => {
    const code = await findOneCode(server, { codeName, codeAuthor });

    return !!code?.code || code?.code === '';
  };

export const getCodeCode =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName }: Types.CodeInfo) => {
    const code = await findOneCode(server, { codeName, codeAuthor });
    if (!code) throw new CustomResponse({ customStatus: 4003 });

    return code.code;
  };

export const isExistCodeById =
  (server: FastifyInstance) =>
  async ({ codeId, codeAuthor }: Types.CodeAuthorWithId) => {
    const code = await findOneCode(server, { codeId, codeAuthor });

    return !!code?.code || code?.code === '';
  };

export const isAnonymousCodeExist =
  (server: FastifyInstance) =>
  async ({ codeName }: Types.CodeName) => {
    const code = await findOneCode(server, { codeName, isAnonymous: true });

    return !!code;
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

export const deleteCodeById =
  (server: FastifyInstance) =>
  async ({ codeId }: Types.CodeId) => {
    const [deleteCodeError, deleteCodeResponse] = await to(
      (async () => await server.store.Code.findByIdAndDelete({ _id: codeId }))(),
    );

    if (deleteCodeError) throw new CustomResponse({ customStatus: 5000 });
    if (!deleteCodeResponse?.id) throw new CustomResponse({ customStatus: 4006 });
  };

export const createCode =
  (server: FastifyInstance) =>
  async ({
    code,
    codeName,
    codeAuthor,
    userId,
    isAnonymous,
    slackChatChannel,
    slackChatTimeStamp,
  }: Types.CreateCodeParams) => {
    const [createCodeError, createCodeResponse] = await to(
      (async () =>
        await server.store.Code.create({
          code,
          codeName,
          codeAuthor,
          userId,
          isAnonymous,
          uploadedChatChannel: slackChatChannel,
          uploadedChatTimeStamp: slackChatTimeStamp,
          createdAt: new Date(),
          updatedAt: new Date(),
        }))(),
    );

    if (createCodeError) throw new CustomResponse({ customStatus: 5000 });
    return { codeId: createCodeResponse.id };
  };

export const updateCode =
  (server: FastifyInstance) =>
  async ({
    code,
    codeId,
    codeName,
    userId,
    isAnonymous,
    slackChatChannel,
    slackChatTimeStamp,
  }: Types.UpdateCodeParams) => {
    const [updateCodeError] = await to(
      (async () =>
        await server.store.Code.findByIdAndUpdate(codeId, {
          code,
          userId,
          codeName,
          isAnonymous,
          uploadedChatChannel: slackChatChannel,
          uploadedChatTimeStamp: slackChatTimeStamp,
          updatedAt: new Date(),
        }))(),
    );

    if (updateCodeError) throw new CustomResponse({ customStatus: 5000 });
  };

export const pushCode =
  (server: FastifyInstance) =>
  async ({
    code,
    codeName,
    codeAuthor,
    userId,
    isAnonymous,
    isAlreadyPushedCode,
    slackChatChannel,
    slackChatTimeStamp,
  }: Types.PushCodeParams) => {
    const [pushCodeError, pushCodeResponse] = await to(
      isAlreadyPushedCode
        ? (async () =>
            await server.store.Code.findOneAndUpdate(
              {
                codeAuthor,
                codeName,
              },
              {
                code,
                userId,
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
              userId,
              isAnonymous,
              uploadedChatChannel: slackChatChannel,
              uploadedChatTimeStamp: slackChatTimeStamp,
              createdAt: new Date(),
              updatedAt: new Date(),
            }))(),
    );

    if (pushCodeError) throw new CustomResponse({ customStatus: 5000 });
    return pushCodeResponse;
  };

export const searchCodes =
  (server: FastifyInstance) =>
  async ({ searchRegex, limit, offset }: Types.SearchCodesParam) => {
    const [error, getCodes] = await to(
      (async () =>
        await server.store.Code.find()
          .or([{ codeName: searchRegex }, { codeAuthor: searchRegex, isAnonymous: false }])
          .sort({ updatedAt: 'desc' })
          .skip(+limit * +offset)
          .limit(+limit))(),
    );

    if (error) throw new CustomResponse({ customStatus: 5000 });

    const codes = getCodes.map(
      ({ code, codeName, codeAuthor, createdAt, userId, updatedAt, _id, isAnonymous }) => ({
        codeId: String(_id),
        code,
        codeName,
        codeAuthor,
        userId,
        createdAt,
        updatedAt,
        isAnonymous,
      }),
    );

    const anonymousCodes = codes.map((code) => ({
      ...code,
      codeAuthor: code.isAnonymous ? '' : code.codeAuthor,
    }));

    return anonymousCodes;
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
