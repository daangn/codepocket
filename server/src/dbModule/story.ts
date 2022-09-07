/* eslint-disable no-underscore-dangle */
import { Types } from '@codepocket/core-server';
import { to } from 'await-to-js';
import { FastifyInstance } from 'fastify';

import { CustomResponse } from '../utils/responseHandler';
import { getCodeInfoById } from './code';

const findStories = async (server: FastifyInstance, { codeAuthor, codeName }: Types.CodeInfo) => {
  const [err, stories] = await to(
    (async () => await server.store.Story.find({ codeAuthor, codeName }))(),
  );
  if (err) throw new CustomResponse({ customStatus: 5000 });
  if (!stories) throw new CustomResponse({ customStatus: 4002 });

  return stories;
};

const findOneStory = async (
  server: FastifyInstance,
  { codeAuthor, codeName, storyAuthor, storyName }: Types.StoryInfo,
) => {
  const [err, story] = await to(
    (async () =>
      await server.store.Story.findOne({ codeAuthor, codeName, storyAuthor, storyName }))(),
  );
  if (err) throw new CustomResponse({ customStatus: 5000 });

  return story;
};

const findOneStoryById = async (server: FastifyInstance, storyId: string) => {
  const [err, story] = await to((async () => await server.store.Story.findById(storyId))());
  if (err) throw new CustomResponse({ customStatus: 5000 });

  return story;
};

export const updateStory =
  (server: FastifyInstance) =>
  async ({ storyId, codes }: Types.StoryIdWithCode) => {
    const [err] = await to(
      (async () =>
        await server.store.Story.findByIdAndUpdate(storyId, { codes: JSON.stringify(codes) }))(),
    );

    if (err) throw new CustomResponse({ customStatus: 5000 });
  };

export const isExistStory =
  (server: FastifyInstance) =>
  async ({ codeId, storyAuthor, storyName }: Types.StoryInfoWithCodeId) => {
    const { codeAuthor, codeName } = await getCodeInfoById(server)({ codeId });
    const story = await findOneStory(server, { codeAuthor, codeName, storyAuthor, storyName });

    return !!story;
  };

export const isExistStoryWithStoryId =
  (server: FastifyInstance) =>
  async ({ storyId }: Types.StoryId) => {
    const story = await findOneStoryById(server, storyId);
    return !!story;
  };

export const getStoryFullNames =
  (server: FastifyInstance) =>
  async ({ codeId }: Types.CodeId) => {
    const { codeAuthor, codeName } = await getCodeInfoById(server)({ codeId });
    const stories = await findStories(server, { codeAuthor, codeName });

    const storyNames = stories.map(({ storyAuthor, storyName, userId, _id }) => ({
      userId,
      storyName: `${storyAuthor}-${storyName}`,
      storyId: String(_id),
    }));
    return storyNames;
  };

export const getStoryCode =
  (server: FastifyInstance) =>
  async ({ storyId }: Types.StoryId) => {
    const story = await findOneStoryById(server, storyId);
    if (!story) throw new CustomResponse({ customStatus: 4002 });

    return JSON.parse(story.codes) as { [x: string]: string };
  };

export const createStory =
  (server: FastifyInstance) =>
  async ({ codeId, storyAuthor, storyName, userId, codes }: Types.StoryInfoWithCode) => {
    const { codeAuthor, codeName } = await getCodeInfoById(server)({ codeId });
    const [createError, story] = await to(
      (async () =>
        await server.store.Story.create({
          codeId,
          userId,
          codeName,
          codeAuthor,
          storyName,
          storyAuthor,
          codes: JSON.stringify(codes),
        }))(),
    );

    if (createError) throw new CustomResponse({ customStatus: 5000 });
    return String(story._id);
  };

export const deleteStory =
  (server: FastifyInstance) =>
  async ({ codeId, storyName, storyAuthor }: Types.StoryInfoWithCodeId) => {
    const [deleteError] = await to(
      (async () =>
        await server.store.Story.deleteOne({
          codeId,
          storyName,
          storyAuthor,
        }))(),
    );

    if (deleteError) throw new CustomResponse({ customStatus: 5000 });
  };

export default (server: FastifyInstance) => ({
  isExistStory: isExistStory(server),
  isExistStoryWithStoryId: isExistStoryWithStoryId(server),
  getStoryFullNames: getStoryFullNames(server),
  getStoryCode: getStoryCode(server),
  createStory: createStory(server),
  deleteStory: deleteStory(server),
  updateStory: updateStory(server),
});
