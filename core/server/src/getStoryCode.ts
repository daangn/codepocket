import { getStoryCodeRequestValidate, GetStoryCodeResponse } from '@codepocket/schema';
import { StoryId } from 'types';

export interface GetStoryCodeType<Response> {
  /* validator에러 */
  validateError?: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: GetStoryCodeResponse) => Response;
  /* 스토리 코드들을 가져오는 함수 */
  getStoryCode: (param: StoryId) => Promise<{ [x: string]: string }>;
}

export default async <T, Response>(request: T, modules: GetStoryCodeType<Response>) => {
  if (!getStoryCodeRequestValidate(request)) throw modules.validateError;
  const { storyId } = request.query;

  const codes = await modules.getStoryCode({ storyId });
  return modules.successResponseFunc({ codes, message: '' });
};
