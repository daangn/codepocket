import { GetCodesResponse } from '@pocket/schema';
import ussCustomQuery from '@shared/hooks/useCustomQuery';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { CodeType, getCodesUrl } from '../api';

const useCodes = () => {
  const [codes, setCodes] = useState<CodeType[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');

  const { data, refetch, isLoading } = ussCustomQuery<GetCodesResponse>({
    url: getCodesUrl,
    params: {
      search: `${searchText}`,
      limit: `${5}`,
      offset: `${offset}`,
    },
    suspense: false,
    useErrorBoundary: true,
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
