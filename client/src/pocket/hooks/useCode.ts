import { GetCodeResponse, getCodeResponseValidate } from '@codepocket/schema';
import useCustomQuery from '@shared/hooks/useCustomQuery';

interface UseCode {
  codeId?: string;
}

const useCode = ({ codeId }: UseCode) =>
  useCustomQuery<GetCodeResponse>({
    url: '/code/id',
    validator: getCodeResponseValidate,
    params: { codeId: `${codeId}` },
  });

export default useCode;
