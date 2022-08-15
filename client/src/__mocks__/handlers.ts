import { VerifyUserResponse } from '@codepocket/schema';
import { rest } from 'msw';

import { BASE_SERVER_URL } from '../shared/constant';

export const verifyUserHandler = () =>
  rest.post(`${BASE_SERVER_URL}/user/auth`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<VerifyUserResponse>({ validUser: true, userName: 'shell', message: 'success' }),
    );
  });
