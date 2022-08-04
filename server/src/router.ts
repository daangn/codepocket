import { PushCodeResponse } from '@pocket/schema';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';

import * as connectDB from './connectDB';
import * as CodeModule from './dbModule/code';
import * as SlackModule from './dbModule/slack';
import * as UserModule from './dbModule/user';
import responseHandler, { CustomResponse } from './utils/responseHandler';

export default fp(async (server: FastifyInstance, _: FastifyPluginOptions) => {
  server.post('/user', (req, reply) =>
    responseHandler(() => connectDB.createUser(server, req), reply),
  );

  server.post('/user/auth', (req, reply) =>
    responseHandler(() => connectDB.verifyUser(server, req), reply),
  );

  server.get('/story/code', (req, reply) =>
    responseHandler(() => connectDB.getStoryCode(server, req), reply),
  );

  server.get('/story/names', (req, reply) =>
    responseHandler(() => connectDB.getStoryNames(server, req), reply),
  );

  server.post('/story', (req, reply) =>
    responseHandler(() => connectDB.createStory(server, req), reply),
  );

  server.post('/code', (req, reply) =>
    responseHandler(
      () =>
        connectDB.pushCode(req, {
          ValidateError: new CustomResponse({ customStatus: 4000 }),
          SuccessResponse: new CustomResponse<PushCodeResponse>({ customStatus: 2006 }),
          slackIsAvailable: SlackModule.isSlackAvailable,
          getAuthorName: UserModule.getAuthorName(server),
          isExistCode: CodeModule.isExistCode(server),
          pushCode: CodeModule.pushCode(server),
        }),
      reply,
    ),
  );

  server.get('/code', (req, reply) =>
    responseHandler(() => connectDB.pullCode(server, req), reply),
  );

  server.get('/code/list', (req, reply) =>
    responseHandler(() => connectDB.getCodeNames(server, req), reply),
  );

  server.post('/code/delete', (req, reply) =>
    responseHandler(() => connectDB.deleteCode(server, req), reply),
  );

  server.get('/codes', (req, reply) =>
    responseHandler(() => connectDB.getCodes(server, req), reply),
  );
});
