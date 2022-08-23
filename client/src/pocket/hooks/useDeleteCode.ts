import {
  DeleteCodeByIdRequest,
  deleteCodeByIdRequestValidate,
  DeleteCodeResponse,
} from '@codepocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { useQueryClient } from '@tanstack/react-query';

import { getCodesUrl } from '../api';

type DeleteCodeByIdBodyType = DeleteCodeByIdRequest['body'];

const usePushCode = () => {
  const queryClient = useQueryClient();
  const { mutate: pushCodeMutate } = useCustomMutation<
    DeleteCodeResponse,
    { message: string },
    DeleteCodeByIdBodyType
  >({
    url: '/code',
    method: 'POST',
    validator: deleteCodeByIdRequestValidate,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries([getCodesUrl]);
      },
    },
  });

  return { pushCode: pushCodeMutate };
};

export default usePushCode;
