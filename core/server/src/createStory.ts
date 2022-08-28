import { createStoryRequestValidate, CreateStoryResponse } from '@codepocket/schema';
import { PocketToken, StoryInfoWithCode, StoryInfoWithCodeId, UserNameWithId } from 'types';

export interface CreateStoryType<Response> {
  /* validator에러 */
  validateError?: Response;
  /* 존재하는 스토리가 있다면 에러 */
  existStoryErrorFunc: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: CreateStoryResponse) => Response;

  /* 스토리가 존재하는지 체크하는 함수 */
  isStoryExist: (param: StoryInfoWithCodeId) => Promise<boolean>;
  /* 토큰으로 유저이름을 가져오는 함수 */
  getUserInfo: (params: PocketToken) => Promise<UserNameWithId>;
  /* 스토리 생성 함수 */
  createStory: (params: StoryInfoWithCode) => Promise<string>;
}

export default async <T, Response>(request: T, modules: CreateStoryType<Response>) => {
  if (!createStoryRequestValidate(request)) throw modules.validateError;
  const { pocketToken, codeId, storyName, codes } = request.body;

  const { userName: storyAuthor, userId } = await modules.getUserInfo({ pocketToken });

  const isStoryExist = await modules.isStoryExist({ codeId, storyAuthor, storyName });
  if (isStoryExist) throw modules.existStoryErrorFunc;
  const storyId = await modules.createStory({ codeId, storyAuthor, storyName, userId, codes });

  return modules.successResponseFunc({ message: '', storyId });
};
