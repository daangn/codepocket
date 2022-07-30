import { GetCodesRequest, GetCodesResponse } from '@pocket/schema';
import to from 'await-to-js';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { CustomResponse } from '../utils/responseHandler';

export default async (server: FastifyInstance, request: FastifyRequest) => {
  const {
    query: { limit = 5, offset = 0, search },
  } = request as GetCodesRequest;

  const searchRegex = new RegExp(search, 'gi');

  const [error, getCodes] = await to(
    (async () =>
      await server.store.Code.find({ codeName: searchRegex })
        .sort({ updatedAt: 'desc' })
        .skip(limit * offset)
        .limit(limit))(),
  );

  if (error) throw new CustomResponse({ customStatus: 5000 });

  const codes = getCodes.map(({ code, codeName, codeAuthor, createdAt, updatedAt }) => ({
    code,
    codeName,
    codeAuthor,
    createdAt,
    updatedAt,
  }));

  const isLast = getCodes.length < limit;

  return new CustomResponse<GetCodesResponse>({
    customStatus: 2003,
    body: { codes, isLast },
  });
};
