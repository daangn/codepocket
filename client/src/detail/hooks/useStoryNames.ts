import { GetStoryNamesResponse, getStoryNamesResponseValidate } from '@pocket/schema';
import useCustomQuery from '@shared/hooks/useCustomQuery';

import { getStoryNamesUrl } from '../api';

interface UseStoryNames {
  codeAuthor?: string;
  codeName?: string;
}

const useStoryNames = ({ codeAuthor, codeName }: UseStoryNames) =>
  useCustomQuery<GetStoryNamesResponse>({
    url: getStoryNamesUrl,
    validator: getStoryNamesResponseValidate,
    params: { codeAuthor: `${codeAuthor}`, codeName: `${codeName}` },
    options: {
      suspense: true,
      useErrorBoundary: true,
    },
  });

export default useStoryNames;
