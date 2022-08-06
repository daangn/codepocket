import { getCodeNamesRequestValidate, GetCodeNamesResponse } from '@pocket/schema';
import { FindCodeInfoUsingRegexParams } from 'types';

interface GetCodeNames<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: GetCodeNamesResponse) => Response;
  findCodeInfoUsingRegex: (params: FindCodeInfoUsingRegexParams) => Promise<{
    codeNames: string[];
    codeAuthors: string[];
  }>;
}

export default async <T, Response>(request: T, modules: GetCodeNames<Response>) => {
  if (!getCodeNamesRequestValidate(request)) throw modules.validateErrorFunc();
  const { codeAuthor, codeName } = request.query;

  const codeNameRegex = new RegExp(codeName, 'gi');
  const codeAuthorRegex = new RegExp(codeAuthor, 'gi');

  const { codeAuthors, codeNames } = await modules.findCodeInfoUsingRegex({
    codeAuthorRegex,
    codeNameRegex,
  });

  return modules.successResponseFunc({ message: '', codeNames, authors: codeAuthors });
};
