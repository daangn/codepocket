import { to } from 'await-to-js';
import { FastifyInstance } from 'fastify';

import { GetStoryCodeParam } from '../connectDB/getStoryCode';
import { GetStoryParam } from '../connectDB/getStoryNames';
import { CustomResponse } from '../utils/responseHandler';

export const getStories =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName }: GetStoryParam) => {
    const [err, stories] = await to(
      (async () => await server.store.Story.find({ codeAuthor, codeName }))(),
    );
    if (err) throw new CustomResponse({ customStatus: 5000 });
    if (!stories) throw new CustomResponse({ customStatus: 4002 });

    return stories;
  };

export const getStory =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName, storyAuthor, storyName }: GetStoryCodeParam) => {
    const [err, story] = await to(
      (async () =>
        await server.store.Story.findOne({ codeAuthor, codeName, storyAuthor, storyName }))(),
    );
    if (err) throw new CustomResponse({ customStatus: 5000 });
    if (!story) throw new CustomResponse({ customStatus: 4002 });

    return story;
  };

export const getStoryFullNames =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName }: GetStoryParam) => {
    const stories = await getStories(server)({ codeAuthor, codeName });

    // FIXME: string반환에서 객체 반환으로 바꾸기
    const storyNames = stories.map(
      ({ codeAuthor, codeName, storyAuthor, storyName }) =>
        `${codeAuthor}/${codeName}_${storyAuthor}-${storyName}`,
    );
    return storyNames;
  };

export const getStoryCode =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName, storyAuthor, storyName }: GetStoryCodeParam) => {
    const story = await getStory(server)({ codeAuthor, codeName, storyAuthor, storyName });
    return JSON.parse(story.codes) as { [x: string]: string };
  };
