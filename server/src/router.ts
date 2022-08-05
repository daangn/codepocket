import * as core from '@pocket/core-server';
import * as Schema from '@pocket/schema';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';

import * as CodeModule from './dbModule/code';
import * as StoryModule from './dbModule/story';
import * as UserModule from './dbModule/user';
import { env } from './utils/env';
import responseHandler, { CustomResponse } from './utils/responseHandler';

export default fp(async (server: FastifyInstance, _: FastifyPluginOptions) => {
  server.post('/user', (req, reply) =>
    responseHandler(
      () =>
        core.createUser(req, {
          validateErrorFunc: () => new CustomResponse({ customStatus: 4001 }),
          successResponseFunc: (body) =>
            new CustomResponse<Schema.CreateUserResponse>({ customStatus: 2007, body }),
          checkExistUser: UserModule.checkExistUser(server),
          createUser: UserModule.createUser(server),
        }),
      reply,
    ),
  );

  server.post('/user/auth', (req, reply) =>
    responseHandler(
      () =>
        core.verifyUser(req, {
          validateErrorFunc: () => new CustomResponse({ customStatus: 4001 }),
          successResponseFunc: (body) =>
            new CustomResponse<Schema.VerifyUserResponse>({ customStatus: 2000, body }),
          getUserName: UserModule.getAuthorName(server),
        }),
      reply,
    ),
  );

  server.get('/story/code', (req, reply) =>
    responseHandler(
      () =>
        core.getStoryCode(req, {
          validateErrorFunc: () => new CustomResponse({ customStatus: 4001 }),
          successResponseFunc: (body) =>
            new CustomResponse<Schema.GetStoryCodeResponse>({ customStatus: 2001, body }),
          getStoryCode: StoryModule.getStoryCode(server),
        }),
      reply,
    ),
  );

  server.get('/story/names', (req, reply) =>
    responseHandler(
      () =>
        core.getStoryNames(req, {
          validateErrorFunc: () => new CustomResponse({ customStatus: 4001 }),
          successResponseFunc: (body) =>
            new CustomResponse<Schema.GetStoryNamesResponse>({ customStatus: 2001, body }),
          getStoryNames: StoryModule.getStoryFullNames(server),
        }),
      reply,
    ),
  );

  server.post('/story', (req, reply) =>
    responseHandler(
      () =>
        core.createStory(req, {
          validateErrorFunc: () => new CustomResponse({ customStatus: 4001 }),
          successResponseFunc: () =>
            new CustomResponse<Schema.CreateStoryResponse>({ customStatus: 2001 }),
          isStoryExist: StoryModule.existStory(server),
          getUserName: UserModule.getAuthorName(server),
          createStory: StoryModule.createStory(server),
        }),
      reply,
    ),
  );

  server.post('/code', (req, reply) =>
    responseHandler(
      () =>
        core.pushCode(req, {
          validateErrorFunc: () => new CustomResponse({ customStatus: 4000 }),
          successResponseFunc: () =>
            new CustomResponse<Schema.PushCodeResponse>({ customStatus: 2006 }),
          slackConfig: {
            SLACK_BOT_TOKEN: env.SLACK_BOT_TOKEN,
            CHAPTER_FRONTED_CHANNEL_ID: env.CHAPTER_FRONTED_CHANNEL_ID,
            CODEPOCKET_CHANNEL_ID: env.CODEPOCKET_CHANNEL_ID,
          },
          getAuthorName: UserModule.getAuthorName(server),
          isExistCode: CodeModule.isExistCode(server),
          pushCode: CodeModule.pushCode(server),
        }),
      reply,
    ),
  );

  server.get('/code', (req, reply) =>
    responseHandler(
      () =>
        core.pullCode(req, {
          validateErrorFunc: () => new CustomResponse({ customStatus: 4001 }),
          successResponseFunc: (body) =>
            new CustomResponse<Schema.PullCodeResponse>({ customStatus: 2004, body }),
          getCode: CodeModule.getCodeCode(server),
        }),
      reply,
    ),
  );

  server.get('/code/list', (req, reply) =>
    responseHandler(
      () =>
        core.getCodeNames(req, {
          validateErrorFunc: () => new CustomResponse({ customStatus: 4001 }),
          successResponseFunc: (body) =>
            new CustomResponse<Schema.GetCodeNamesResponse>({ customStatus: 2003, body }),
          findCodeInfoUsingRegex: CodeModule.findCodeInfoUsingRegex(server),
        }),
      reply,
    ),
  );

  server.post('/code/delete', (req, reply) =>
    responseHandler(
      () =>
        core.deleteCode(req, {
          validateErrorFunc: () => new CustomResponse({ customStatus: 4001 }),
          existCodeErrorFunc: () => new CustomResponse({ customStatus: 4006 }),
          successResponseFunc: () =>
            new CustomResponse<Schema.DeleteCodeResponse>({ customStatus: 2002 }),
          getUserName: UserModule.getAuthorName(server),
          isExistCode: CodeModule.isExistCode(server),
          deleteCode: CodeModule.deleteCode(server),
        }),
      reply,
    ),
  );

  server.get('/codes', (req, reply) =>
    responseHandler(
      () =>
        core.getCodes(req, {
          validateErrorFunc: () => new CustomResponse({ customStatus: 4001 }),
          successResponseFunc: (body) =>
            new CustomResponse<Schema.GetCodesResponse>({ customStatus: 2003, body }),
          searchCodes: CodeModule.searchCodes(server),
        }),
      reply,
    ),
  );
});
