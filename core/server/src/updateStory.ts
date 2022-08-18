import { updateStoryRequestValidate, UpdateStoryResponse } from '@codepocket/schema';
import { StoryId, StoryIdWithCode } from 'types';

export interface UpdateStoryType<Response> {
  /* validate에러 */
  validateError?: Response;
  /* 존재하지 스토리 없다면 에러 */
  existStoryErrorFunc: () => Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: UpdateStoryResponse) => Response;

  /* 스토리가 존재하는지 체크하는 함수 */
  isStoryExist: (param: StoryId) => Promise<boolean>;
  /* 스토리 수정 함수 */
  updateStory: (param: StoryIdWithCode) => Promise<void>;
}

export default async <T, Response>(request: T, modules: UpdateStoryType<Response>) => {
  if (!updateStoryRequestValidate(request)) throw modules.validateError;
  const { storyId, code } = request.body;

  const existStory = await modules.isStoryExist({ storyId });
  if (!existStory) throw modules.existStoryErrorFunc();

  await modules.updateStory({ code, storyId });

  return modules.successResponseFunc({ message: '' });
};
