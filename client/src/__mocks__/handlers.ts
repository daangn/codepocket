import { VerifyUserResponse } from '@pocket/schema';
import { rest } from 'msw';

import { BASE_LOCAL_SERVER_URL } from '../shared/constant';

export const verifyUserHandler = () =>
  rest.post(`${BASE_LOCAL_SERVER_URL}/user/auth`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<VerifyUserResponse>({ validUser: true, message: 'success' }),
    );
  });
