import { GetStoryNamesResponse, getStoryNamesResponseValidate } from '@codepocket/schema';
import useCustomQuery from '@shared/hooks/useCustomQuery';

import { getStoryNamesUrl } from '../api';

interface UseStoryNames {
  codeId: string;
}

const useStoryNames = ({ codeId }: UseStoryNames) =>
  useCustomQuery<GetStoryNamesResponse>({
    url: getStoryNamesUrl,
    validator: getStoryNamesResponseValidate,
    params: { codeId },
    options: {
      suspense: true,
      useErrorBoundary: true,
    },
  });

export default useStoryNames;
