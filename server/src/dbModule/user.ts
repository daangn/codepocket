import { to } from 'await-to-js';
import { FastifyInstance } from 'fastify';

import { CustomResponse } from '../utils/responseHandler';

export const findAuthor = (server: FastifyInstance) => async (token: string) => {
  const [findAuthorError, author] = await to(
    (async () => await server.store.User.findOne({ token }))(),
  );

  if (findAuthorError) throw new CustomResponse({ customStatus: 5000 });
  if (!author) throw new CustomResponse({ customStatus: 4000 });
  return author;
};
