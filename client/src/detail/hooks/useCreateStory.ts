import {
  CreateStoryRequest,
  CreateStoryResponse,
  createStoryResponseValidate,
} from '@codepocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { localStorage } from '@shared/utils/localStorage';
import { useQueryClient } from '@tanstack/react-query';

import { createStoryUrl, getStoryNamesUrl } from '../api';

type CreateStoryBodyType = CreateStoryRequest['body'];
interface UseCreateStory {
  codeName?: string;
  codeAuthor?: string;
  codeId: string;
  selectStory: (name: string) => void;
  onError: () => void;
}

const useCreateStory = ({ codeId, selectStory, onError }: UseCreateStory) => {
  const queryClient = useQueryClient();
  const { mutate: createStoryMutate, error } = useCustomMutation<
    CreateStoryResponse,
    CreateStoryResponse,
    CreateStoryBodyType
  >({
    url: createStoryUrl,
    method: 'POST',
    validator: createStoryResponseValidate,
    options: {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries([getStoryNamesUrl]);
        selectStory(res.storyId);
      },
      onError,
    },
  });

  const createStory = ({ codes, storyName }: Pick<CreateStoryBodyType, 'codes' | 'storyName'>) => {
    const pocketToken = localStorage.getUserToken();
    if (!pocketToken || !storyName) return;

    createStoryMutate({ codes, storyName, codeId, pocketToken });
  };

  return { createStory, error };
};

export default useCreateStory;
