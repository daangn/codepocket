import { createStoryRequestValidate, CreateStoryResponse } from '@codepocket/schema';
import { PocketToken, StoryInfoWithCode, StoryInfoWithCodeId } from 'types';

interface CreateStoryType<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: CreateStoryResponse) => Response;
  isStoryExist: (param: StoryInfoWithCodeId) => Promise<boolean>;
  getUserName: (params: PocketToken) => Promise<string>;
  createStory: (params: StoryInfoWithCode) => Promise<string>;
}

export default async <T, Response>(request: T, modules: CreateStoryType<Response>) => {
  if (!createStoryRequestValidate(request)) throw modules.validateErrorFunc();
  const { pocketToken, codeId, storyName, codes } = request.body;

  const storyAuthor = await modules.getUserName({ pocketToken });

  await modules.isStoryExist({ codeId, storyAuthor, storyName });
  const storyId = await modules.createStory({ codeId, storyAuthor, storyName, codes });

  return modules.successResponseFunc({ message: '', storyId });
};
