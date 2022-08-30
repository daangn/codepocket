import { getStoryNamesRequestValidate, GetStoryNamesResponse } from '@codepocket/schema';
import { CodeId, StoryNamesWithCodeId } from 'types';

export interface GetStoryNamesType<Response> {
  /* validator에러 */
  validateError?: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: GetStoryNamesResponse) => Response;

  /* 스토리 이름들을 가져오는 함수 */
  getStoryNames: (params: CodeId) => Promise<StoryNamesWithCodeId[]>;
}

export default async <T, Response>(request: T, modules: GetStoryNamesType<Response>) => {
  if (!getStoryNamesRequestValidate(request)) throw modules.validateError;
  const { codeId } = request.query;
  const storyNames = await modules.getStoryNames({ codeId });

  return modules.successResponseFunc({ storyNames, message: '' });
};
