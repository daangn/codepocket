import { getCodeAuthorsRequestValidate, GetCodeAuthorsResponse } from '@codepocket/schema';
import { CodeAuthor, CodeName } from 'types';

export interface GetCodeAuthorsType<Response> {
  validateErrorFunc?: Response;
  successResponseFunc: (body: GetCodeAuthorsResponse) => Response;
  findCodeAuthors: (params: CodeName) => Promise<CodeAuthor[]>;
}

export default async <T, Response>(request: T, modules: GetCodeAuthorsType<Response>) => {
  if (!getCodeAuthorsRequestValidate(request)) throw modules.validateErrorFunc;
  const { codeName } = request.query;

  const codeAuthors = await modules.findCodeAuthors({ codeName });

  return modules.successResponseFunc({ message: '', codeAuthors });
};
