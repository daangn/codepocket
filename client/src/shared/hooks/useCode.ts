import { GetCodeResponse, getCodeResponseValidate } from '@codepocket/schema';
import useCustomQuery from '@shared/hooks/useCustomQuery';

interface UseCode {
  codeId?: string;
  onError?: () => void;
}

const useCode = ({ codeId, onError }: UseCode) =>
  useCustomQuery<GetCodeResponse>({
    url: '/code/id',
    validator: getCodeResponseValidate,
    params: { codeId: `${codeId}` },
    options: { onError },
  });

export default useCode;
