import { VerifyUserRequest } from '@pocket/schema';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { CustomResponse } from '../utils/responseHandler';

export default async (server: FastifyInstance, request: FastifyRequest) => {
  const {
    body: { pocketToken },
  } = request as VerifyUserRequest;

  if (!pocketToken) throw new CustomResponse({ customStatus: 4000 });

  const author = await server.store.User.findOne({ token: pocketToken });
  if (!author) throw new CustomResponse({ customStatus: 4000 });

  return new CustomResponse({ customStatus: 2000 });
};
