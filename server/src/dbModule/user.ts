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

export const getUserInfo =
  (server: FastifyInstance) =>
  async ({ pocketToken }: Types.PocketToken) => {
    const author = await findAuthor(server)(pocketToken);
    return { userName: author.userName, userId: author.id };
  };

export const getUserPrivateInfo =
  (server: FastifyInstance) =>
  async ({ userName, email }: Types.UserInfo) => {
    const [findAuthorError, author] = await to(
      (async () => await server.store.User.findOne({ userName, email }))(),
    );

    if (findAuthorError) throw new CustomResponse({ customStatus: 5000 });
    return author ? { pocketToken: author.token, userId: author.id } : null;
  };

export const createUser =
  (server: FastifyInstance) =>
  async ({ userName, email }: Types.UserInfo) => {
    // NOTE: KEY값은 cli/lib/utils.ts의 KEY변수와 동일하게 맞춰주세요
    const KEY = 'key';
    const encoded = { userName, serverUrl: env.SELF_URL } as JwtType;
    const token = jwt.sign(encoded, KEY);

    const [createUserError, createUserResponse] = await to(
      (async () => await server.store.User.create({ userName, email, token }))(),
    );
    if (createUserError) throw new CustomResponse({ customStatus: 5000 });

    return { pocketToken: token, userId: createUserResponse.id };
  };

export default (server: FastifyInstance) => ({
  findAuthor: findAuthor(server),
  getUserInfo: getUserInfo(server),
  getUserPrivateInfo: getUserPrivateInfo(server),
  createUser: createUser(server),
});
