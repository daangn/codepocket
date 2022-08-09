import { getStoryCodeRequestValidate, GetStoryCodeResponse } from '@codepocket/schema';
import { StoryInfo } from 'types';

interface GetStoryCode<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: GetStoryCodeResponse) => Response;
  getStoryCode: (param: StoryInfo) => Promise<{ [x: string]: string }>;
}

export default async <T, Response>(request: T, modules: GetStoryCode<Response>) => {
  if (!getStoryCodeRequestValidate(request)) throw modules.validateErrorFunc();
  const { codeAuthor, codeName, storyAuthor, storyName } = request.query;

  const codes = await modules.getStoryCode({ codeAuthor, codeName, storyAuthor, storyName });
  return modules.successResponseFunc({ codes, message: '' });
};
