import { PullCodeRequest, PullCodeResponse } from '@pocket/schema';
import to from 'await-to-js';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { CustomResponse } from '../utils/responseHandler';

export default async (server: FastifyInstance, request: FastifyRequest) => {
  const {
    query: { codeName, codeAuthor },
  } = request as PullCodeRequest;

  if (!codeName || !codeAuthor) throw new CustomResponse({ customStatus: 4005 });

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
