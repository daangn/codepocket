import { PushCodeRequest, PushCodeResponse, pushCodeResponseValidate } from '@codepocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { useQueryClient } from '@tanstack/react-query';

type PushCodeBodyType = PushCodeRequest['body'];

const usePushCode = () => {
  const queryClient = useQueryClient();
  const { mutate: pushCodeMutate } = useCustomMutation<
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

  return { pushCode: pushCodeMutate };
};

export default usePushCode;
