import { createStoryRequestValidate, CreateStoryResponse } from '@pocket/schema';
import { PocketToken, StoryInfo, StoryInfoWithCode } from 'types';

interface CreateStoryType<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: CreateStoryResponse) => Response;
  isStoryExist: (param: StoryInfo) => Promise<boolean>;
  getUserName: (params: PocketToken) => Promise<string>;
  createStory: (params: StoryInfoWithCode) => Promise<void>;
}

export default async <T, Response>(request: T, modules: CreateStoryType<Response>) => {
  if (!createStoryRequestValidate(request)) throw modules.validateErrorFunc();
  const { pocketToken, codeAuthor, codeName, storyName, codes } = request.body;

  const storyAuthor = await modules.getUserName({ pocketToken });

  await modules.isStoryExist({ codeAuthor, codeName, storyAuthor, storyName });
  await modules.createStory({ codeAuthor, codeName, storyAuthor, storyName, codes });

  return modules.successResponseFunc({ message: '' });
};
