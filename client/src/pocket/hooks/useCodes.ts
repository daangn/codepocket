import { GetCodesResponse, getCodesResponseValidate } from '@codepocket/schema';
import useCustomQuery from '@shared/hooks/useCustomQuery';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { getCodesUrl } from '../api';

const useCodes = () => {
  const [codes, setCodes] = useState<GetCodesResponse['codes']>([]);
  const [offset, setOffset] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');

  const { data, refetch, isLoading } = useCustomQuery<GetCodesResponse>({
    url: getCodesUrl,
    validator: getCodesResponseValidate,
    params: {
      search: `${searchText}`,
      limit: `5`,
      offset: `${offset}`,
    },
    options: {
      suspense: false,
      useErrorBoundary: true,
      staleTime: 0,
      cacheTime: 0,
    },
  });

  const isLast = useMemo(() => data?.isLast, [data?.isLast]);

  const hasData: boolean = useMemo(
    () => !!(searchText && !codes.length),
    [codes.length, searchText],
  );

  const getNextCodes = useCallback(() => {
    refetch();
    setOffset((prev) => prev + 1);
  }, [refetch]);

  const changeSearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  useEffect(() => {
    const newCodes = data?.codes || [];
    setCodes((prevCodes) => [...prevCodes, ...newCodes]);
  }, [data?.codes]);

  useEffect(() => {
    if (codes.length) {
      setCodes([]);
      setOffset(0);
    }
    const newCodes = data?.codes || [];
    setCodes((prevCodes) => [...prevCodes, ...newCodes]);
  }, [searchText]);

  return { codes, hasData, searchText, isLast, isLoading, changeSearchText, getNextCodes };
};
export default useCodes;
