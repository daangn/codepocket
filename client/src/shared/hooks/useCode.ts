import { GetCodeResponse, getCodeResponseValidate } from '@codepocket/schema';
import { getCodeByIdAPI } from '@shared/api';
import useCustomQuery from '@shared/hooks/useCustomQuery';

interface UseCode {
  codeId?: string;
  onError?: () => void;
}

const useCode = ({ codeId, onError }: UseCode) =>
  useCustomQuery<GetCodeResponse>({
    url: getCodeByIdAPI,
    validator: getCodeResponseValidate,
    params: { codeId: `${codeId}` },
    options: { onError },
  });

export default useCode;
