import {
  UpdateCodeRequest,
  UpdateCodeResponse,
  updateCodeResponseValidate,
} from '@codepocket/schema';
import { getCodeByIdAPI } from '@shared/api';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { useQueryClient } from '@tanstack/react-query';

import { getCodesUrl } from '../api';

type UpdateCodeBodyType = UpdateCodeRequest['body'];

interface UseUpdateCode {
  codeId?: string;
  onError?: () => void;
}

const useUpdateCode = ({ codeId }: UseUpdateCode) => {
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
        await queryClient.invalidateQueries([getCodeByIdAPI, { codeId }]);
      },
    },
  });

  return { updateCode: updateCodeMutate };
};

export default useUpdateCode;
