import { GetStoryCodeResponse, getStoryCodeResponseValidate } from '@pocket/schema';
import useCustomQuery from '@shared/hooks/useCustomQuery';
import { useCallback, useEffect, useState } from 'react';

import { getStoryCodeUrl, StoryFullName } from '../api';
import { SelectedStory } from '../components/Sandpack';

interface UseStory {
  codeAuthor?: string;
  codeName?: string;
}

const useStory = ({ codeAuthor, codeName }: UseStory) => {
  const [selectedStory, setSelectedStory] = useState<SelectedStory>();
  const [selectedStoryName, setSelectedStoryName] = useState<StoryFullName>();
  const { refetch: getStory } = useCustomQuery<GetStoryCodeResponse>({
    url: getStoryCodeUrl,
    validator: getStoryCodeResponseValidate,
    params: {
      codeAuthor: `${codeAuthor}`,
      codeName: `${codeName}`,
      storyAuthor: `${selectedStoryName?.split('-')[0]}`,
      storyName: `${selectedStoryName?.split('-')[1]}`,
    },
    options: {
      suspense: true,
      useErrorBoundary: true,
      enabled: false,
    },
  });

  const selectStory = async (name: StoryFullName) => {
    const [_, storyName] = name.split('_');
    if (selectedStoryName === storyName) return setSelectedStoryName(undefined);

    return setSelectedStoryName(storyName as StoryFullName);
  };

  const getStoryCode = useCallback(async () => {
    if (!selectedStoryName) return setSelectedStory(undefined);

    const { data } = await getStory();
    const newSelectedStory = { codes: data?.codes || {} };
    return setSelectedStory(newSelectedStory);
  }, [getStory, selectedStoryName]);

  useEffect(() => {
    getStoryCode();
  }, [selectedStoryName]);

  return { selectedStory, selectedStoryName, selectStory };
};
export default useStory;
