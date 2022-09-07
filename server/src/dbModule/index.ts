import { FastifyInstance } from 'fastify';

import createCodeModule from './code';
import createStoryModule from './story';
import createUserModule from './user';

export default (server: FastifyInstance) => ({
  CodeModule: createCodeModule(server),
  StoryModule: createStoryModule(server),
  UserModule: createUserModule(server),
});
