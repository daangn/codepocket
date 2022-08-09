import { Types } from '@codepocket/core-server';
import { to } from 'await-to-js';
import { FastifyInstance } from 'fastify';

import { CustomResponse } from '../utils/responseHandler';

export const getStories =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName }: Types.CodeInfo) => {
    const [err, stories] = await to(
      (async () => await server.store.Story.find({ codeAuthor, codeName }))(),
    );
    if (err) throw new CustomResponse({ customStatus: 5000 });
    if (!stories) throw new CustomResponse({ customStatus: 4002 });

    return stories;
  };

export const getStory =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName, storyAuthor, storyName }: Types.StoryInfo) => {
    const [err, story] = await to(
      (async () =>
        await server.store.Story.findOne({ codeAuthor, codeName, storyAuthor, storyName }))(),
    );
    if (err) throw new CustomResponse({ customStatus: 5000 });
    if (!story) throw new CustomResponse({ customStatus: 4002 });

    return story;
  };

export const existStory =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName, storyAuthor, storyName }: Types.StoryInfo) => {
    const [err, story] = await to(
      (async () =>
        await server.store.Story.findOne({ codeAuthor, codeName, storyAuthor, storyName }))(),
    );
    if (err) throw new CustomResponse({ customStatus: 5000 });
    return !!story;
  };

export const getStoryFullNames =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName }: Types.CodeInfo) => {
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
  async ({ codeAuthor, codeName, storyAuthor, storyName }: Types.StoryInfo) => {
    const story = await getStory(server)({ codeAuthor, codeName, storyAuthor, storyName });
    return JSON.parse(story.codes) as { [x: string]: string };
  };

export const createStory =
  (server: FastifyInstance) =>
  async ({ codeAuthor, codeName, storyAuthor, storyName, codes }: Types.StoryInfoWithCode) => {
    const [createError] = await to(
      (async () =>
        await server.store.Story.create({
          codeName,
          codeAuthor,
          storyName,
          storyAuthor,
          codes: JSON.stringify(codes),
        }))(),
    );

    if (createError) throw new CustomResponse({ customStatus: 5000 });
  };
