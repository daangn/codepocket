import { getStoryNamesRequestValidate, GetStoryNamesResponse } from '@pocket/schema';

export interface GetStoryParam {
  codeAuthor: string;
  codeName: string;
}

interface GetStoryNamesType<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: GetStoryNamesResponse) => Response;
  getStoryNames: ({ codeAuthor, codeName }: GetStoryParam) => Promise<string[]>;
}

export default async <T, Response>(request: T, modules: GetStoryNamesType<Response>) => {
  if (!getStoryNamesRequestValidate(request)) throw modules.validateErrorFunc();
  const { codeAuthor, codeName } = request.query;

  const storyNames = await modules.getStoryNames({ codeAuthor, codeName });

  return modules.successResponseFunc({ storyNames, message: '' });
};
