import { deleteStoryRequestValidate, DeleteStoryResponse } from '@codepocket/schema';
import { StoryInfoWithCodeId } from 'types';

export interface DeleteStoryType<Response> {
  /* validator에러 */
  validateError?: Response;
  /* 스토리가 존재하지 않을 경우 에러 */
  existStoryErrorFunc: () => Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: DeleteStoryResponse) => Response;

  /* 존재하는 스토리인지 확인하는 함수 */
  isExistStory: (params: StoryInfoWithCodeId) => Promise<boolean>;
  /* 스토리를 삭제하는 함수 */
  deleteStory: (params: StoryInfoWithCodeId) => Promise<void>;
}

export default async <T, Response>(request: T, modules: DeleteStoryType<Response>) => {
  if (!deleteStoryRequestValidate(request)) throw modules.validateError;
  const { codeId, storyAuthor, storyName } = request.body;

  const existStory = await modules.isExistStory({ storyAuthor, storyName, codeId });
  if (!existStory) throw modules.existStoryErrorFunc();

  await modules.deleteStory({ storyAuthor, storyName, codeId });

  return modules.successResponseFunc({ message: '' });
};
