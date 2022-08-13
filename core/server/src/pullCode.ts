import { pullCodeRequestValidate, PullCodeResponse } from '@codepocket/schema';
import { CodeInfo } from 'types';

export interface PullCodeType<Response> {
  /* validator에러 */
  validateError?: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: PullCodeResponse) => Response;

  /* 코드를 가져오는 함수 */
  getCode: (params: CodeInfo) => Promise<string>;
}

export default async <T, Response>(request: T, modules: PullCodeType<Response>) => {
  if (!pullCodeRequestValidate(request)) throw modules.validateError;
  const { codeName, codeAuthor } = request.query;

  const code = await modules.getCode({ codeAuthor, codeName });

  return modules.successResponseFunc({ code, message: '' });
};
