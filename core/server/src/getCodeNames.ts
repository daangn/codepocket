import { getCodeNamesRequestValidate, GetCodeNamesResponse } from '@pocket/schema';
import { CodeInfoWithAnonymous, FindCodeInfoUsingRegexParams } from 'types';

interface GetCodeNames<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: GetCodeNamesResponse) => Response;
  findCodeInfoUsingRegex: (
    params: FindCodeInfoUsingRegexParams,
  ) => Promise<CodeInfoWithAnonymous[]>;
}

export default async <T, Response>(request: T, modules: GetCodeNames<Response>) => {
  if (!getCodeNamesRequestValidate(request)) throw modules.validateErrorFunc();
  const { codeAuthor, codeName } = request.query;

  const codeNameRegex = new RegExp(codeName || '', 'gi');
  const codeAuthorRegex = new RegExp(codeAuthor || '', 'gi');

  const codeInfos = await modules.findCodeInfoUsingRegex({
    codeAuthorRegex,
    codeNameRegex,
    isCodeAuthorExist: !!codeAuthor,
  });

  return modules.successResponseFunc({ message: '', codeInfos });
};
