import {
  CreateStoryRequest,
  CreateStoryResponse,
  createStoryResponseValidate,
} from '@pocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { localStorage } from '@shared/utils/localStorage';
import { useQueryClient } from '@tanstack/react-query';

import { createStoryUrl, getStoryNamesUrl, StoryFullName } from '../api';

type CreateStoryBodyType = CreateStoryRequest['body'];
interface UseCreateStory {
  codeName?: string;
  codeAuthor?: string;
  selectStory: (name: StoryFullName) => void;
}

const useCreateStory = ({ codeAuthor, codeName, selectStory }: UseCreateStory) => {
  const queryClient = useQueryClient();
  const { mutate: createStoryMutate } = useCustomMutation<
    CreateStoryResponse,
    CreateStoryResponse,
    CreateStoryBodyType
  >({
    url: createStoryUrl,
    method: 'POST',
    validator: createStoryResponseValidate,
    options: {
      onSuccess: async (_, vars) => {
        await queryClient.invalidateQueries([getStoryNamesUrl]);
        // TODO: 로컬스토리지에서 username받아오는게 token으로 바껴서 로직 수정 필요
        const storyAuth = localStorage.getUserToken();
        const storyName = `${storyAuth}-${vars.storyName}` as StoryFullName;
        selectStory(`${codeAuthor}/${codeName}_${storyName}`);
      },
    },
  });

  const createStory = ({ codes, storyName }: Pick<CreateStoryBodyType, 'codes' | 'storyName'>) => {
    // TODO: 로컬스토리지에서 username받아오는게 token으로 바껴서 로직 수정 필요
    const storyAuthor = localStorage.getUserToken();
    if (!storyAuthor || !storyName || !codeName || !codeAuthor) return;

    createStoryMutate({
      codes,
      storyName,
      codeName,
      codeAuthor,
      pocketToken: storyAuthor,
    });
  };

  return {
    createStory,
  };
};

export default useCreateStory;
