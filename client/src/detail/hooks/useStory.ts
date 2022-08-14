import { GetStoryCodeResponse, getStoryCodeResponseValidate } from '@codepocket/schema';
import useCustomQuery from '@shared/hooks/useCustomQuery';
import { useCallback, useEffect, useState } from 'react';

import { getStoryCodeUrl } from '../api';
import { SelectedStory } from '../components/Sandpack';

const useStory = () => {
  const [selectedStory, setSelectedStory] = useState<SelectedStory>();
  const [selectedStoryId, setSelectedStoryId] = useState<string>('');
  const { refetch: getStory } = useCustomQuery<GetStoryCodeResponse>({
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
    if (!selectedStoryId) return setSelectedStory(undefined);

    const { data } = await getStory();
    const newSelectedStory = { codes: data?.codes || {} };
    return setSelectedStory(newSelectedStory);
  }, [getStory, selectedStoryId]);

  useEffect(() => {
    getStoryCode();
  }, [selectedStoryId]);

  return { selectedStory, selectedStoryId, selectStory };
};
export default useStory;
