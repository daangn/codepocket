import { Types } from '@codepocket/core-server';
import { JwtType } from '@codepocket/schema';
import { to } from 'await-to-js';
import { FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';

import { env } from '../utils/env';
import { CustomResponse } from '../utils/responseHandler';

export const findAuthor = (server: FastifyInstance) => async (token: string) => {
  const [findAuthorError, author] = await to(
    (async () => await server.store.User.findOne({ token }))(),
  );

  if (findAuthorError) throw new CustomResponse({ customStatus: 5000 });
  if (!author) throw new CustomResponse({ customStatus: 4000 });
  return author;
};

export const getAuthorName =
  (server: FastifyInstance) =>
  async ({ pocketToken }: Types.PocketToken) => {
    const author = await findAuthor(server)(pocketToken);
    return author.userName;
  };

export const checkExistUser =
  (server: FastifyInstance) =>
  async ({ userName, email }: Types.UserInfo) => {
    const [findAuthorError, author] = await to(
      (async () => await server.store.User.findOne({ userName, email }))(),
    );

    if (findAuthorError) throw new CustomResponse({ customStatus: 5000 });
    return author ? { pocketToken: author.token } : null;
  };

export const createUser =
  (server: FastifyInstance) =>
  async ({ userName, email }: Types.UserInfo) => {
    const encoded = { userName, serverUrl: env.SELF_URL } as JwtType;
    const token = jwt.sign(encoded, 'key');

    const [createUserError] = await to(
      (async () => await server.store.User.create({ userName, email, token }))(),
    );
    if (createUserError) throw new CustomResponse({ customStatus: 5000 });

    return { pocketToken: token };
  };
