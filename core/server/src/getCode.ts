import { getCodeRequestValidate, GetCodeResponse } from '@codepocket/schema';
import { CodeId, CodeInfoWithCode } from 'types';

export interface GetCodeType<Response> {
  /* validator에러 */
  validateError?: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: GetCodeResponse) => Response;

  /* code의 id로 code의 정보들을 가져오는 함수 */
  getCodeInfoById: (params: CodeId) => Promise<CodeInfoWithCode>;
}

export default async <T, Response>(request: T, modules: GetCodeType<Response>) => {
  if (!getCodeRequestValidate(request)) throw modules.validateError;
  const { codeId } = request.query;

  const codeInfo = await modules.getCodeInfoById({ codeId });

  const { code, codeAuthor, codeName, isAnonymous } = codeInfo;
  return modules.successResponseFunc({ code, codeAuthor, codeName, isAnonymous, message: '' });
};
