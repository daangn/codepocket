import { GetStoryCodeResponse, getStoryCodeResponseValidate } from '@codepocket/schema';
import useCustomQuery from '@shared/hooks/useCustomQuery';
import { useCallback, useEffect, useState } from 'react';

import { getStoryCodeUrl } from '../api';
import { SelectedStory } from '../components/Sandpack';

const useStory = () => {
  const [selectedStoryId, setSelectedStoryId] = useState<string>('');
  const [selectedStoryCodes, setSelectedStoryCodes] = useState<SelectedStory>();
  const { refetch: getStory, error } = useCustomQuery<GetStoryCodeResponse>({
    url: getStoryCodeUrl,
    validator: getStoryCodeResponseValidate,
    params: {
      storyId: selectedStoryId,
    },
    options: {
      enabled: false,
    },
  });

  const selectStory = async (id: string) => {
    if (selectedStoryId === id) return setSelectedStoryId('');
    return setSelectedStoryId(id);
  };

  const getStoryCode = useCallback(async () => {
    if (!selectedStoryId) return setSelectedStoryCodes(undefined);

    const { data } = await getStory();
    const newSelectedStory = { codes: data?.codes || {} };
    return setSelectedStoryCodes(newSelectedStory);
  }, [getStory, selectedStoryId]);

  useEffect(() => {
    getStoryCode();
  }, [selectedStoryId]);

  return { selectedStoryCodes, error, selectedStoryId, selectStory };
};
export default useStory;
