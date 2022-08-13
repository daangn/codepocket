import { getStoryNamesRequestValidate, GetStoryNamesResponse } from '@codepocket/schema';
import { CodeId, StoryNamesWithCodeId } from 'types';

interface GetStoryNamesType<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: GetStoryNamesResponse) => Response;
  getStoryNames: (params: CodeId) => Promise<StoryNamesWithCodeId[]>;
}

export default async <T, Response>(request: T, modules: GetStoryNamesType<Response>) => {
  if (!getStoryNamesRequestValidate(request)) throw modules.validateErrorFunc();
  const { codeId } = request.query;

  const storyNames = await modules.getStoryNames({ codeId });

  return modules.successResponseFunc({ storyNames, message: '' });
};
