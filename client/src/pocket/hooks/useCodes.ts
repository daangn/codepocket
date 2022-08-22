import { GetCodesResponse } from '@codepocket/schema';
import useCustomInfiniteQuery from '@shared/hooks/useCustomInfiniteQuery';
import { useCallback, useState } from 'react';

import { getCodesUrl } from '../api';

const useCodes = () => {
  const [searchText, setSearchText] = useState<string>('');

  const { data, error, isLoading, fetchNextPage } = useCustomInfiniteQuery<{
    data: GetCodesResponse;
  }>({
    url: getCodesUrl,
    params: {
      search: `${searchText}`,
      limit: `5`,
    },
  });

  const codes = data?.pages.reduce<any>((acc, page) => [...acc, ...page.data.codes], []) || [];
  const isLast = data?.pages.at(-1)?.data.isLast;

  const getNextCodes = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  const changeSearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  return {
    codes,
    error,
    isLast,
    searchText,
    isLoading,
    changeSearchText,
    getNextCodes,
  };
};
export default useCodes;
