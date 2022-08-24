import {
  CreateCodeRequest,
  CreateCodeResponse,
  createCodeResponseValidate,
} from '@codepocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { useQueryClient } from '@tanstack/react-query';

import { getCodesUrl } from '../api';

type CreateCodeBodyType = CreateCodeRequest['body'];

const useCreateCode = () => {
  const queryClient = useQueryClient();
  const { mutate: createCodeMutate } = useCustomMutation<
    CreateCodeResponse,
    { message: string },
    CreateCodeBodyType
  >({
    url: '/code/create',
    method: 'POST',
    validator: createCodeResponseValidate,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries([getCodesUrl]);
      },
    },
  });

  return { createCode: createCodeMutate };
};

export default useCreateCode;
