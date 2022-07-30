import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';

import * as connectDB from './connectDB';
import responseHandler from './utils/responseHandler';

export default fp(async (server: FastifyInstance, _: FastifyPluginOptions) => {
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
    responseHandler(() => connectDB.pushCode(server, req), reply),
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
