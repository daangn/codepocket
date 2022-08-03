import { PullCodeResponse } from '@pocket/schema';
import useCustomQuery from '@shared/hooks/useCustomQuery';

import { getCodeUrl } from '../api';

interface UseCode {
  codeAuthor?: string;
  codeName?: string;
}

const useCode = ({ codeAuthor, codeName }: UseCode) =>
  useCustomQuery<PullCodeResponse>({
    url: getCodeUrl,
    params: { codeAuthor: `${codeAuthor}`, codeName: `${codeName}` },
    options: {
      suspense: true,
      useErrorBoundary: true,
    },
  });

export default useCode;
