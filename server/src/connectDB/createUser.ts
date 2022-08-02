import { createUserRequestValidate, CreateUserResponse } from '@pocket/schema';
import to from 'await-to-js';
import { FastifyInstance } from 'fastify';
import stringHash from 'string-hash';

import { CustomResponse } from '../utils/responseHandler';

export default async <T>(server: FastifyInstance, request: T) => {
  if (!createUserRequestValidate(request)) throw new CustomResponse({ customStatus: 4001 });
  const { userName, email } = request.body;

  const token = String(stringHash(userName));
  const [error, isExistUser] = await to(
    (async () => await server.store.User.findOne({ userName, email }))(),
  );
  if (error) throw new CustomResponse({ customStatus: 5000 });
  if (isExistUser)
    return new CustomResponse<CreateUserResponse>({
      customStatus: 2007,
      body: { pocketToken: token },
    });

  const [createError] = await to(
    (async () => await server.store.User.create({ userName, email, token }))(),
  );
  if (createError) throw new CustomResponse({ customStatus: 5000 });

  return new CustomResponse<CreateUserResponse>({
    customStatus: 2007,
    body: { pocketToken: token },
  });
};
