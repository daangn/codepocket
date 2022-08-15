import { GetCodeResponse, getCodeResponseValidate } from '@codepocket/schema';
import useCustomQuery from '@shared/hooks/useCustomQuery';

import { getCodeUrl } from '../api';

interface UseCode {
  codeId?: string;
}

const useCode = ({ codeId }: UseCode) =>
  useCustomQuery<GetCodeResponse>({
    url: getCodeUrl,
    validator: getCodeResponseValidate,
    params: { codeId: `${codeId}` },
  });

export default useCode;
