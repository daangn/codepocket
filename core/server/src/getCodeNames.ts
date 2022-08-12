import { getCodeNamesRequestValidate, GetCodeNamesResponse } from '@codepocket/schema';
import { CodeInfoWithAnonymous, FindCodeInfoUsingRegexParams } from 'types';

export interface GetCodeNamesType<Response> {
  /* validator에러 */
  validateErrorFunc?: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: GetCodeNamesResponse) => Response;

  /* Regex로 코드 정보를 찾아오기 */
  findCodeInfoUsingRegex: (
    params: FindCodeInfoUsingRegexParams,
  ) => Promise<CodeInfoWithAnonymous[]>;
}

export default async <T, Response>(request: T, modules: GetCodeNamesType<Response>) => {
  if (!getCodeNamesRequestValidate(request)) throw modules.validateErrorFunc;
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
