import { CreateStoryRequest, CreateStoryResponse } from '@pocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { getUserNameFormLocalStorage } from '@shared/utils/localStorage';
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
    options: {
      onSuccess: async (_, vars) => {
        await queryClient.invalidateQueries([getStoryNamesUrl]);
        const storyAuth = getUserNameFormLocalStorage();
        const storyName = `${storyAuth}-${vars.storyName}` as StoryFullName;
        selectStory(`${codeAuthor}/${codeName}_${storyName}`);
      },
    },
  });

  const createStory = ({ codes, storyName }: Pick<CreateStoryBodyType, 'codes' | 'storyName'>) => {
    const storyAuthor = getUserNameFormLocalStorage();
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
