import { GetCodesResponse } from '@codepocket/schema';
import useCustomInfiniteQuery from '@shared/hooks/useCustomInfiniteQuery';
import { useCallback, useMemo, useState } from 'react';

import { getCodesUrl } from '../api';

const LIMIT = 5;
const useCodes = () => {
  const [searchText, setSearchText] = useState<string>('');

  const { data, error, isLoading, fetchNextPage } = useCustomInfiniteQuery<GetCodesResponse>({
    url: getCodesUrl,
    params: {
      search: searchText,
      limit: LIMIT,
    },
  });

  const isLast = useMemo(() => !!data?.pages.at(-1)?.data.isLast, [data]);
  const codes = useMemo(
    () =>
      data?.pages.reduce<GetCodesResponse['codes']>(
        (acc, page) => [...acc, ...page.data.codes],
        [],
      ) || [],
    [data],
  );

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
