import { GetStoryNamesResponse, getStoryNamesResponseValidate } from '@codepocket/schema';
import useCustomQuery from '@shared/hooks/useCustomQuery';

import { getStoryNamesUrl } from '../api';

interface UseStoryNames {
  codeId: string;
  onError: () => void;
}

const useStoryNames = ({ codeId, onError }: UseStoryNames) =>
  useCustomQuery<GetStoryNamesResponse>({
    url: getStoryNamesUrl,
    validator: getStoryNamesResponseValidate,
    params: { codeId },
    options: { onError },
  });

export default useStoryNames;
