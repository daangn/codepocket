import { getStoryCodeRequestValidate, GetStoryCodeResponse } from '@pocket/schema';

export interface GetStoryCodeParam {
  codeAuthor: string;
  codeName: string;
  storyAuthor: string;
  storyName: string;
}

interface GetStoryCode<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: GetStoryCodeResponse) => Response;
  getStoryCode: (param: GetStoryCodeParam) => Promise<{ [x: string]: string }>;
}

export default async <T, Response>(request: T, modules: GetStoryCode<Response>) => {
  if (!getStoryCodeRequestValidate(request)) throw modules.validateErrorFunc();
  const { codeAuthor, codeName, storyAuthor, storyName } = request.query;

  const codes = await modules.getStoryCode({ codeAuthor, codeName, storyAuthor, storyName });
  return modules.successResponseFunc({ codes, message: '' });
};
