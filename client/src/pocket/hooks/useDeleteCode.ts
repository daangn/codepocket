import {
  DeleteCodeByIdRequest,
  DeleteCodeByIdResponse,
  deleteCodeByIdResponseValidate,
} from '@codepocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { useQueryClient } from '@tanstack/react-query';

import { deleteCodeByIdUrl, getCodesUrl } from '../api';

type DeleteCodeByIdBodyType = DeleteCodeByIdRequest['body'];

const useDeleteCode = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCodeMutate } = useCustomMutation<
    DeleteCodeByIdResponse,
    { message: string },
    DeleteCodeByIdBodyType
  >({
    url: deleteCodeByIdUrl,
    method: 'POST',
    validator: deleteCodeByIdResponseValidate,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries([getCodesUrl]);
      },
    },
  });

  return { deleteCode: deleteCodeMutate };
};

export default useDeleteCode;
