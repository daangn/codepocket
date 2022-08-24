import {
  UpdateCodeRequest,
  UpdateCodeResponse,
  updateCodeResponseValidate,
} from '@codepocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { useQueryClient } from '@tanstack/react-query';

import { getCodesUrl } from '../api';

type UpdateCodeBodyType = UpdateCodeRequest['body'];

const useUpdateCode = () => {
  const queryClient = useQueryClient();
  const { mutate: updateCodeMutate } = useCustomMutation<
    UpdateCodeResponse,
    { message: string },
    UpdateCodeBodyType
  >({
    url: '/code/update',
    method: 'PUT',
    validator: updateCodeResponseValidate,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries([getCodesUrl]);
      },
    },
  });

  return { updateCode: updateCodeMutate };
};

export default useUpdateCode;
