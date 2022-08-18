import {
  UpdateStoryRequest,
  UpdateStoryResponse,
  updateStoryResponseValidate,
} from '@codepocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { useQueryClient } from '@tanstack/react-query';

import { getStoryNamesUrl } from '../api';

type UpdateStoryRequestBody = UpdateStoryRequest['body'];

const useUpdateStory = () => {
  const queryClient = useQueryClient();
  const { mutate: updateStoryMutate } = useCustomMutation<
    UpdateStoryResponse,
    { message: string },
    UpdateStoryRequestBody
  >({
    url: '/story',
    method: 'PUT',
    validator: updateStoryResponseValidate,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries([getStoryNamesUrl]);
      },
    },
  });
  return { updateStory: updateStoryMutate };
};

export default useUpdateStory;
