import { GetStoryNamesRequest, GetStoryNamesResponse } from '@pocket/schema';
import { to } from 'await-to-js';
import { FastifyInstance, FastifyRequest } from 'fastify';

import { CustomResponse } from '../utils/responseHandler';

export default async (server: FastifyInstance, request: FastifyRequest) => {
  const {
    query: { codeAuthor, codeName },
  } = request as GetStoryNamesRequest;

  if (!codeAuthor || !codeName) throw new CustomResponse({ customStatus: 4001 });

  const [err, stories] = await to(
    (async () => await server.store.Story.find({ codeAuthor, codeName }))(),
  );
  if (err) throw new CustomResponse({ customStatus: 5000 });
  if (!stories) throw new CustomResponse({ customStatus: 4002 });

  // FIXME: string반환에서 객체 반환으로 바꾸기
  const storyNames = stories.map(
    ({ codeAuthor, codeName, storyAuthor, storyName }) =>
      `${codeAuthor}/${codeName}_${storyAuthor}-${storyName}`,
  );
  return new CustomResponse<Omit<GetStoryNamesResponse, 'message'>>({
    customStatus: 2001,
    body: { storyNames },
  });
};
