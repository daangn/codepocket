import {
  CreateStoryRequest,
  CreateStoryResponse,
  createStoryResponseValidate,
} from '@pocket/schema';
import { EMAIL_DOMAIN_NAME } from '@shared/constant';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { localStorage } from '@shared/utils/localStorage';
import { useQueryClient } from '@tanstack/react-query';

import useCustomAuth0 from '../../auth/hooks/useCustomAuth0';
import { createStoryUrl, getStoryNamesUrl, StoryFullName } from '../api';

type CreateStoryBodyType = CreateStoryRequest['body'];
interface UseCreateStory {
  codeName?: string;
  codeAuthor?: string;
  selectStory: (name: StoryFullName) => void;
}

const useCreateStory = ({ codeAuthor, codeName, selectStory }: UseCreateStory) => {
  const queryClient = useQueryClient();
  const { user } = useCustomAuth0({ domain: EMAIL_DOMAIN_NAME });
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
