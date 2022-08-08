import { getCodeAuthorsRequestValidate, GetCodeAuthorsResponse } from '@pocket/schema';
import { CodeName } from 'types';

interface GetCodeAuthors<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: GetCodeAuthorsResponse) => Response;
  findCodeAuthors: (params: CodeName) => Promise<string[]>;
}

export default async <T, Response>(request: T, modules: GetCodeAuthors<Response>) => {
  if (!getCodeAuthorsRequestValidate(request)) throw modules.validateErrorFunc();
  const { codeName } = request.query;

  const codeAuthors = await modules.findCodeAuthors({ codeName });

  return modules.successResponseFunc({ message: '', codeAuthors });
};
