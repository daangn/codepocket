import { pullCodeRequestValidate, PullCodeResponse } from '@pocket/schema';
import { to } from 'await-to-js';
import { FastifyInstance } from 'fastify';

import { CustomResponse } from '../utils/responseHandler';

export default async <T>(server: FastifyInstance, request: T) => {
  if (!pullCodeRequestValidate(request)) throw new CustomResponse({ customStatus: 4001 });
  const { codeName, codeAuthor } = request.query;

  const [codeFindOneError, codeFindOneResponse] = await to(
    (async () => await server.store.Code.findOne({ codeName, codeAuthor }))(),
  );

  if (codeFindOneError) throw new CustomResponse({ customStatus: 5000 });
  if (!codeFindOneResponse) throw new CustomResponse({ customStatus: 4003 });

  const { code } = codeFindOneResponse;

  return new CustomResponse<PullCodeResponse>({
    customStatus: 2004,
    body: { code },
  });
};
