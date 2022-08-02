import { verifyUserRequestValidate, VerifyUserResponse } from '@pocket/schema';
import { FastifyInstance } from 'fastify';

import { CustomResponse } from '../utils/responseHandler';

export default async <T>(server: FastifyInstance, request: T) => {
  if (!verifyUserRequestValidate(request)) throw new CustomResponse({ customStatus: 4000 });
  const { pocketToken } = request.body;

  const author = await server.store.User.findOne({ token: pocketToken });
  if (!author) throw new CustomResponse({ customStatus: 4000 });

  return new CustomResponse<VerifyUserResponse>({
    customStatus: 2000,
    body: { validUser: true, userName: author.userName },
  });
};
