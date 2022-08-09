import { useAuth0 } from '@auth0/auth0-react';
import {
  CreateStoryRequest,
  CreateStoryResponse,
  createStoryResponseValidate,
} from '@codepocket/schema';
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
  const { user } = useAuth0();
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
        if (!user) return;
        await queryClient.invalidateQueries([getStoryNamesUrl]);
        const storyName = `${user.nickname}-${vars.storyName}` as StoryFullName;
        selectStory(`${codeAuthor}/${codeName}_${storyName}`);
      },
    },
  });

  const createStory = ({ codes, storyName }: Pick<CreateStoryBodyType, 'codes' | 'storyName'>) => {
    const pocketToken = localStorage.getUserToken();
    if (!pocketToken || !storyName || !codeName || !codeAuthor) return;

    createStoryMutate({ codes, storyName, codeName, codeAuthor, pocketToken });
  };

  return {
    createStory,
  };
};

export default useCreateStory;
