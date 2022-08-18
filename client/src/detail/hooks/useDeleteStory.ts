import {
  DeleteStoryRequest,
  DeleteStoryResponse,
  deleteStoryResponseValidate,
} from '@codepocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { useQueryClient } from '@tanstack/react-query';

import { getStoryNamesUrl } from '../api';

type DeleteStoryRequestBody = DeleteStoryRequest['body'];

interface UseDeleteStoryParams {
  onSuccessDelete: () => void;
}

const useDeleteStory = ({ onSuccessDelete }: UseDeleteStoryParams) => {
  const queryClient = useQueryClient();
  const { mutate: deleteStoryMutate } = useCustomMutation<
    DeleteStoryResponse,
    { message: string },
    DeleteStoryRequestBody
  >({
    url: '/story',
    method: 'DELETE',
    validator: deleteStoryResponseValidate,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries([getStoryNamesUrl]);
        onSuccessDelete();
      },
    },
  });
  return { deleteStory: deleteStoryMutate };
};

export default useDeleteStory;
