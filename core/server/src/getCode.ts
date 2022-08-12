import { getCodeRequestValidate, GetCodeResponse } from '@codepocket/schema';
import { CodeId, CodeInfoWithCode } from 'types';

export interface GetCodeType<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: GetCodeResponse) => Response;
  getCodeById: (params: CodeId) => Promise<CodeInfoWithCode>;
}

export default async <T, Response>(request: T, modules: GetCodeType<Response>) => {
  if (!getCodeRequestValidate(request)) throw modules.validateErrorFunc();
  const { codeId } = request.query;

  const codeInfo = await modules.getCodeById({ codeId });

  const { code, codeAuthor, codeName, isAnonymous } = codeInfo;
  return modules.successResponseFunc({ code, codeAuthor, codeName, isAnonymous, message: '' });
};
