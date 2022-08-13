import { getStoryCodeRequestValidate, GetStoryCodeResponse } from '@codepocket/schema';
import { StoryId } from 'types';

interface GetStoryCode<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: GetStoryCodeResponse) => Response;
  getStoryCode: (param: StoryId) => Promise<{ [x: string]: string }>;
}

export default async <T, Response>(request: T, modules: GetStoryCode<Response>) => {
  if (!getStoryCodeRequestValidate(request)) throw modules.validateErrorFunc();
  const { storyId } = request.query;

  const codes = await modules.getStoryCode({ storyId });
  return modules.successResponseFunc({ codes, message: '' });
};
