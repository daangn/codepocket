import { to } from 'await-to-js';
import { FastifyInstance } from 'fastify';

import { GetStoryParam } from '../connectDB/getStoryNames';
import { CustomResponse } from '../utils/responseHandler';

export const getStory =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName }: GetStoryParam) => {
    const [err, stories] = await to(
      (async () => await server.store.Story.find({ codeAuthor, codeName }))(),
    );
    if (err) throw new CustomResponse({ customStatus: 5000 });
    if (!stories) throw new CustomResponse({ customStatus: 4002 });

    return stories;
  };

export const getStoryFullNames =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName }: GetStoryParam) => {
    const stories = await getStory(server)({ codeAuthor, codeName });

    // FIXME: string반환에서 객체 반환으로 바꾸기
    const storyNames = stories.map(
      ({ codeAuthor, codeName, storyAuthor, storyName }) =>
        `${codeAuthor}/${codeName}_${storyAuthor}-${storyName}`,
    );
    return storyNames;
  };
