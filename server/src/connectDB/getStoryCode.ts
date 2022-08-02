import { getStoryCodeRequestValidate, GetStoryCodeResponse } from '@pocket/schema';
import { to } from 'await-to-js';
import { FastifyInstance } from 'fastify';

import { CustomResponse } from '../utils/responseHandler';

export default async <T>(server: FastifyInstance, request: T) => {
  if (!getStoryCodeRequestValidate(request)) throw new CustomResponse({ customStatus: 4001 });
  const { codeAuthor, codeName, storyAuthor, storyName } = request.query;

  const [err, story] = await to(
    (async () =>
      await server.store.Story.findOne({ codeAuthor, codeName, storyAuthor, storyName }))(),
  );
  if (err) throw new CustomResponse({ customStatus: 5000 });
  if (!story) throw new CustomResponse({ customStatus: 4002 });

  const { codes } = story;
  return new CustomResponse<Omit<GetStoryCodeResponse, 'message'>>({
    customStatus: 2001,
    body: { codes: JSON.parse(codes) },
  });
};
