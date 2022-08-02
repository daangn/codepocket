import { getCodeNamesRequestValidate, GetCodeNamesResponse } from '@pocket/schema';
import to from 'await-to-js';
import { FastifyInstance } from 'fastify';

import { CustomResponse } from '../utils/responseHandler';
import { filterDuplicate } from '../utils/string';

export default async <T>(server: FastifyInstance, request: T) => {
  if (!getCodeNamesRequestValidate(request)) throw new CustomResponse({ customStatus: 4001 });
  const { codeAuthor, codeName } = request.query;

  const codeNameRegex = new RegExp(codeName, 'gi');
  const codeAuthorRegex = new RegExp(codeAuthor, 'gi');

  const [error, codes] = await to(
    (async () =>
      await server.store.Code.find({ codeName: codeNameRegex, codeAuthor: codeAuthorRegex }).sort({
        updatedAt: 'desc',
      }))(),
  );

  if (error) throw new CustomResponse({ customStatus: 5000 });

  // TODO: reduce 사용해서 한 번으로 뽑아내기
  const codeNames = codes.map(({ codeName }) => codeName); // eslint-disable-line no-shadow
  const codeAuthors = codes.map(({ codeAuthor }) => codeAuthor); // eslint-disable-line no-shadow

  return new CustomResponse<GetCodeNamesResponse>({
    customStatus: 2003,
    body: {
      authors: filterDuplicate(codeAuthors),
      codeNames,
    },
  });
};
