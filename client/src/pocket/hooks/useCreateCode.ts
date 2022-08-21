import { PushCodeRequest, PushCodeResponse, pushCodeResponseValidate } from '@codepocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { useQueryClient } from '@tanstack/react-query';

type PushCodeBodyType = PushCodeRequest['body'];

const useCreateCode = () => {
  const queryClient = useQueryClient();
  const { mutate: createCodeMutate } = useCustomMutation<
    PushCodeResponse,
    { message: string },
    PushCodeBodyType
  >({
    url: '/code',
    method: 'POST',
    validator: pushCodeResponseValidate,
    options: {
      onSuccess: async () => {
        await queryClient.invalidateQueries([]);
      },
    },
  });

  return { createCode: createCodeMutate };
};

export default useCreateCode;
