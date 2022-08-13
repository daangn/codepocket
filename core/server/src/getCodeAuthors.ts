import { getCodeAuthorsRequestValidate, GetCodeAuthorsResponse } from '@codepocket/schema';
import { CodeAuthor, CodeName } from 'types';

export interface GetCodeAuthorsType<Response> {
  /* validator에러 */
  validateError?: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: GetCodeAuthorsResponse) => Response;

  /* 특정 codeName을 가지고 있는 codeAuthor들을 찾는 함수 */
  findCodeAuthors: (params: CodeName) => Promise<CodeAuthor[]>;
}

export default async <T, Response>(request: T, modules: GetCodeAuthorsType<Response>) => {
  if (!getCodeAuthorsRequestValidate(request)) throw modules.validateError;
  const { codeName } = request.query;

  const codeAuthors = await modules.findCodeAuthors({ codeName });

  return modules.successResponseFunc({ message: '', codeAuthors });
};
