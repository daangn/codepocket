import { createStoryRequestValidate, CreateStoryResponse } from '@codepocket/schema';
import { PocketToken, StoryInfo, StoryInfoWithCode } from 'types';

export interface CreateStoryType<Response> {
  /* validator에러 */
  validateError?: Response;
  /* 존재하는 스토리가 있다면 에러 */
  existStoryErrorFunc: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: CreateStoryResponse) => Response;

  /* 스토리가 존재하는지 체크하는 함수 */
  isStoryExist: (param: StoryInfo) => Promise<boolean>;
  /* 토큰으로 유저이름을 가져오는 함수 */
  getUserName: (params: PocketToken) => Promise<string>;
  /* 스토리 생성 함수 */
  createStory: (params: StoryInfoWithCode) => Promise<void>;
}

export default async <T, Response>(request: T, modules: CreateStoryType<Response>) => {
  if (!createStoryRequestValidate(request)) throw modules.validateError;
  const { pocketToken, codeAuthor, codeName, storyName, codes } = request.body;

  const storyAuthor = await modules.getUserName({ pocketToken });

  const isExistStory = await modules.isStoryExist({ codeAuthor, codeName, storyAuthor, storyName });
  if (isExistStory) return modules.existStoryErrorFunc;

  await modules.createStory({ codeAuthor, codeName, storyAuthor, storyName, codes });

  return modules.successResponseFunc({ message: '' });
};
