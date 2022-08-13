import { getStoryNamesRequestValidate, GetStoryNamesResponse } from '@codepocket/schema';
import { CodeInfo } from 'types';

export interface GetStoryNamesType<Response> {
  /* validator에러 */
  validateError?: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: GetStoryNamesResponse) => Response;

  /* 스토리 이름들을 가져오는 함수 */
  getStoryNames: ({ codeAuthor, codeName }: CodeInfo) => Promise<string[]>;
}

export default async <T, Response>(request: T, modules: GetStoryNamesType<Response>) => {
  if (!getStoryNamesRequestValidate(request)) throw modules.validateError;
  const { codeAuthor, codeName } = request.query;

  const storyNames = await modules.getStoryNames({ codeAuthor, codeName });

  return modules.successResponseFunc({ storyNames, message: '' });
};
