import { createConnector } from '@codepocket/core-server';
import * as Schema from '@codepocket/schema';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';

import createDBModule from './dbModule';
import { env } from './utils/env';
import responseHandler, { CustomResponse } from './utils/responseHandler';

export default fp(async (server: FastifyInstance, _: FastifyPluginOptions) => {
  const { CodeModule, StoryModule, UserModule } = createDBModule(server);
  const connector = createConnector<CustomResponse>({
    validateError: new CustomResponse({ customStatus: 4001 }),
    slackAPIError: new CustomResponse({ customStatus: 5001 }),
    slackConfig: {
      BASE_WEB_URL: env.WEB_URL,
      CHAPTER_FRONTED_CHANNEL_ID: env.CHAPTER_FRONTED_CHANNEL_ID,
      CODEPOCKET_CHANNEL_ID: env.CODEPOCKET_CHANNEL_ID,
      SLACK_BOT_TOKEN: env.SLACK_BOT_TOKEN,
    },
  });

  server.post('/user', (req, reply) =>
    responseHandler(
      () =>
        connector.createUser(req, {
          successResponseFunc: (body) =>
            new CustomResponse<Schema.CreateUserResponse>({ customStatus: 2007, body }),
          getUserPrivateInfo: UserModule.getUserPrivateInfo,
          createUser: UserModule.createUser,
        }),
      reply,
    ),
  );

  server.post('/user/auth', (req, reply) =>
    responseHandler(
      () =>
        connector.verifyUser(req, {
          successResponseFunc: (body) =>
            new CustomResponse<Schema.VerifyUserResponse>({ customStatus: 2000, body }),
          getUserInfo: UserModule.getUserInfo,
        }),
      reply,
    ),
  );

  server.get('/story/code', (req, reply) =>
    responseHandler(
      () =>
        connector.getStoryCode(req, {
          successResponseFunc: (body) =>
            new CustomResponse<Schema.GetStoryCodeResponse>({ customStatus: 2001, body }),
          getStoryCode: StoryModule.getStoryCode,
        }),
      reply,
    ),
  );

  server.get('/story/names', (req, reply) =>
    responseHandler(
      () =>
        connector.getStoryNames(req, {
          successResponseFunc: (body) =>
            new CustomResponse<Schema.GetStoryNamesResponse>({ customStatus: 2001, body }),
          getStoryNames: StoryModule.getStoryFullNames,
        }),
      reply,
    ),
  );

  server.post('/story', (req, reply) =>
    responseHandler(
      () =>
        connector.createStory(req, {
          successResponseFunc: (body) =>
            new CustomResponse<Schema.CreateStoryResponse>({ body, customStatus: 2001 }),
          existStoryErrorFunc: new CustomResponse({ customStatus: 4004 }),
          isStoryExist: StoryModule.isExistStory,
          getUserInfo: UserModule.getUserInfo,
          createStory: StoryModule.createStory,
        }),
      reply,
    ),
  );

  server.put('/story', (req, reply) =>
    responseHandler(
      () =>
        connector.updateStory(req, {
          successResponseFunc: () =>
            new CustomResponse<Schema.UpdateStoryResponse>({ customStatus: 2009 }),
          existStoryErrorFunc: () => new CustomResponse({ customStatus: 4002 }),
          isStoryExist: StoryModule.isExistStoryWithStoryId,
          updateStory: StoryModule.updateStory,
        }),
      reply,
    ),
  );

  server.put('/code/update', (req, reply) =>
    responseHandler(
      () =>
        connector.updateCode(req, {
          successResponseFunc: () =>
            new CustomResponse<Schema.UpdateCodeResponse>({ customStatus: 2006 }),
          notExistCodeError: new CustomResponse({ customStatus: 4008 }),
          getUserInfo: UserModule.getUserInfo,
          checkExistCodeWithCodeId: CodeModule.isExistCodeWithCodeId,
          updateCode: CodeModule.updateCode,
        }),
      reply,
    ),
  );

  server.get('/code/id', (req, reply) =>
    responseHandler(
      () =>
        connector.getCode(req, {
          successResponseFunc: (body) =>
            new CustomResponse<Schema.GetCodeResponse>({ customStatus: 2007, body }),
          getCodeInfoById: CodeModule.getCodeInfoById,
        }),
      reply,
    ),
  );

  server.post('/code', (req, reply) =>
    responseHandler(
      () =>
        connector.pushCode(req, {
          successResponseFunc: () =>
            new CustomResponse<Schema.PushCodeResponse>({ customStatus: 2006 }),
          existAnonymousError: new CustomResponse({ customStatus: 4009 }),
          isAnonymousCodeExist: CodeModule.isAnonymousCodeExist,
          getUserInfo: UserModule.getUserInfo,
          isExistCode: CodeModule.isExistCode,
          pushCode: CodeModule.pushCode,
        }),
      reply,
    ),
  );

  server.post('/code/create', (req, reply) =>
    responseHandler(
      () =>
        connector.createCode(req, {
          successResponseFunc: () =>
            new CustomResponse<Schema.CreateCodeResponse>({ customStatus: 2005 }),
          existCodeNameError: new CustomResponse({ customStatus: 4010 }),
          getUserInfo: UserModule.getUserInfo,
          isExistCodeName: CodeModule.isExistCode,
          createCode: CodeModule.createCode,
        }),
      reply,
    ),
  );

  server.get('/code', (req, reply) =>
    responseHandler(
      () =>
        connector.pullCode(req, {
          successResponseFunc: (body) =>
            new CustomResponse<Schema.PullCodeResponse>({ customStatus: 2004, body }),
          getCode: CodeModule.getCodeCode,
        }),
      reply,
    ),
  );

  server.get('/code/authors', (req, reply) =>
    responseHandler(
      () =>
        connector.getCodeAuthors(req, {
          successResponseFunc: (body) =>
            new CustomResponse<Schema.GetCodeAuthorsResponse>({ customStatus: 2003, body }),
          findCodeAuthors: CodeModule.findCodeAuthors,
        }),
      reply,
    ),
  );

  server.get('/code/list', (req, reply) =>
    responseHandler(
      () =>
        connector.getCodeNames(req, {
          successResponseFunc: (body) =>
            new CustomResponse<Schema.GetCodeNamesResponse>({ customStatus: 2003, body }),
          findCodeInfoUsingRegex: CodeModule.findCodeInfoUsingRegex,
        }),
      reply,
    ),
  );

  server.post('/code/delete', (req, reply) =>
    responseHandler(
      () =>
        connector.deleteCode(req, {
          existCodeErrorFunc: () => new CustomResponse({ customStatus: 4006 }),
          successResponseFunc: () =>
            new CustomResponse<Schema.DeleteCodeResponse>({ customStatus: 2002 }),
          getUserInfo: UserModule.getUserInfo,
          isExistCode: CodeModule.isExistCode,
          deleteCode: CodeModule.deleteCode,
        }),
      reply,
    ),
  );

  server.post('/code/delete/id', (req, reply) =>
    responseHandler(
      () =>
        connector.deleteCodeById(req, {
          existCodeErrorFunc: () => new CustomResponse({ customStatus: 4006 }),
          successResponseFunc: () =>
            new CustomResponse<Schema.DeleteCodeByIdRequest>({ customStatus: 2002 }),
          getUserInfo: UserModule.getUserInfo,
          isExistCode: CodeModule.isExistCodeById,
          deleteCodeById: CodeModule.deleteCodeById,
        }),
      reply,
    ),
  );

  server.delete('/story', (req, reply) =>
    responseHandler(
      () =>
        connector.deleteStory(req, {
          existStoryErrorFunc: () => new CustomResponse({ customStatus: 4002 }),
          successResponseFunc: () =>
            new CustomResponse<Schema.DeleteStoryResponse>({ customStatus: 2008 }),
          isExistStory: StoryModule.isExistStory,
          deleteStory: StoryModule.deleteStory,
        }),
      reply,
    ),
  );

  server.get('/codes', (req, reply) =>
    responseHandler(
      () =>
        connector.getCodes(req, {
          successResponseFunc: (body) =>
            new CustomResponse<Schema.GetCodesResponse>({ customStatus: 2003, body }),
          searchCodes: CodeModule.searchCodes,
        }),
      reply,
    ),
  );
});
