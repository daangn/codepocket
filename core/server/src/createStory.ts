import { createStoryRequestValidate, CreateStoryResponse } from '@pocket/schema';

export interface CreateStoryParams {
  codeName: string;
  codeAuthor: string;
  storyName: string;
  storyAuthor: string;
  codes: { [x: string]: string };
}

export interface IsStoryExistParams {
  codeName: string;
  codeAuthor: string;
  storyName: string;
  storyAuthor: string;
}

export interface GetStoryNameParams {
  pocketToken: string;
}

interface CreateStoryType<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: CreateStoryResponse) => Response;
  isStoryExist: (param: IsStoryExistParams) => Promise<boolean>;
  getUserName: (params: GetStoryNameParams) => Promise<string>;
  createStory: (params: CreateStoryParams) => Promise<void>;
}

export default async <T, Response>(request: T, modules: CreateStoryType<Response>) => {
  if (!createStoryRequestValidate(request)) throw modules.validateErrorFunc();
  const { pocketToken, codeAuthor, codeName, storyName, codes } = request.body;

  const storyAuthor = await modules.getUserName({ pocketToken });

  await modules.isStoryExist({ codeAuthor, codeName, storyAuthor, storyName });
  await modules.createStory({ codeAuthor, codeName, storyAuthor, storyName, codes });

  return modules.successResponseFunc({ message: '' });
};
