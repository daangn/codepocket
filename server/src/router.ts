import { createConnector } from '@codepocket/core-server';
import * as Schema from '@codepocket/schema';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';

import * as CodeModule from './dbModule/code';
import * as StoryModule from './dbModule/story';
import * as UserModule from './dbModule/user';
import { checkSlackPossible, env } from './utils/env';
import responseHandler, { CustomResponse } from './utils/responseHandler';

export default fp(async (server: FastifyInstance, _: FastifyPluginOptions) => {
  const connector = createConnector<CustomResponse>({
    validateErrorFunc: new CustomResponse({ customStatus: 4001 }),
    slackAPIError: new CustomResponse({ customStatus: 5001 }),
    slackConfig: checkSlackPossible
      ? {
          SLACK_BOT_TOKEN: env.SLACK_BOT_TOKEN,
          CHAPTER_FRONTED_CHANNEL_ID: env.CHAPTER_FRONTED_CHANNEL_ID,
          CODEPOCKET_CHANNEL_ID: env.CODEPOCKET_CHANNEL_ID,
        }
      : undefined,
  });

  server.post('/user', (req, reply) =>
    responseHandler(
      () =>
        connector.createUser(req, {
          successResponseFunc: (body) =>
            new CustomResponse<Schema.CreateUserResponse>({ customStatus: 2007, body }),
          getUsetToken: UserModule.getUserToken(server),
          createUser: UserModule.createUser(server),
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
          getUserName: UserModule.getAuthorName(server),
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
          getStoryCodes: StoryModule.getStoryCodes(server),
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
          getStoryNames: StoryModule.getStoryFullNames(server),
        }),
      reply,
    ),
  );

  server.post('/story', (req, reply) =>
    responseHandler(
      () =>
        connector.createStory(req, {
          successResponseFunc: () =>
            new CustomResponse<Schema.CreateStoryResponse>({ customStatus: 2001 }),
          existStoryErrorFunc: new CustomResponse({ customStatus: 4004 }),
          isStoryExist: StoryModule.existStory(server),
          getUserName: UserModule.getAuthorName(server),
          createStory: StoryModule.createStory(server),
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
          getCodeInfoById: CodeModule.getCodeInfoById(server),
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
          isAnonymousCodeExist: CodeModule.isAnonymousCodeExist(server),
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
        connector.pullCode(req, {
          successResponseFunc: (body) =>
            new CustomResponse<Schema.PullCodeResponse>({ customStatus: 2004, body }),
          getCode: CodeModule.getCodeCode(server),
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
          findCodeAuthors: CodeModule.findCodeAuthors(server),
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
          findCodeInfoUsingRegex: CodeModule.findCodeInfoUsingRegex(server),
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
        connector.getCodes(req, {
          successResponseFunc: (body) =>
            new CustomResponse<Schema.GetCodesResponse>({ customStatus: 2003, body }),
          searchCodes: CodeModule.searchCodes(server),
        }),
      reply,
    ),
  );
});
