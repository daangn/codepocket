import { createStoryRequestValidate, CreateStoryResponse } from '@pocket/schema';
import { to } from 'await-to-js';
import { FastifyInstance } from 'fastify';

import { CustomResponse } from '../utils/responseHandler';

export default async <T>(server: FastifyInstance, request: T) => {
  if (!createStoryRequestValidate(request)) throw new CustomResponse({ customStatus: 4001 });
  const { pocketToken, codeAuthor, codeName, storyName, codes } = request.body;

  const [findAuthorError, storyAuthor] = await to(
    (async () => await server.store.User.findOne({ token: pocketToken }))(),
  );
  if (findAuthorError) throw new CustomResponse({ customStatus: 5000 });
  if (!storyAuthor) throw new CustomResponse({ customStatus: 4000 });

  const [findStoryError, existStory] = await to(
    (async () =>
      await server.store.Story.findOne({
        codeName,
        codeAuthor,
        storyName,
        storyAuthor: storyAuthor.userName,
      }))(),
  );
  if (findStoryError) throw new CustomResponse({ customStatus: 5000 });
  if (existStory) throw new CustomResponse({ customStatus: 4004 });

  const [createError] = await to(
    (async () =>
      await server.store.Story.create({
        codeName,
        codeAuthor,
        storyName,
        storyAuthor: storyAuthor.userName,
        codes: JSON.stringify(codes),
      }))(),
  );

  if (createError) throw new CustomResponse({ customStatus: 5000 });

  return new CustomResponse<CreateStoryResponse>({ customStatus: 2001 });
};
