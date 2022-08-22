import { QueryFunctionContext, QueryKey, useInfiniteQuery } from '@tanstack/react-query';

import { APIErrorType, axiosInstance } from '../lib/axios';

interface useCustomInfiniteQueryInterface {
  url: string;
  params?: { [param: string]: string };
}

interface Fetcher {
  nextPage: number;
  prevPage: number;
}

const fetcher = async <T>({ queryKey, pageParam = 0 }: QueryFunctionContext): Promise<T> => {
  const [url, params] = queryKey;
  const { data } = await axiosInstance.get(
    url as string,
    { params: { ...(params as any), offset: pageParam } } as any,
  );
  return { data, nextPage: pageParam + 1, prevPage: pageParam - 1 } as any;
};

const useCustomInfiniteQuery = <Response>({ url, params }: useCustomInfiniteQueryInterface) => {
  const res = useInfiniteQuery<Response & Fetcher, APIErrorType, Response, QueryKey>(
    [url!, params],
    ({ queryKey, meta, pageParam }) => fetcher({ queryKey, meta, pageParam }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
      getPreviousPageParam: (firstPage) => firstPage.prevPage,
    },
  );

  return res;
};

export default useCustomInfiniteQuery;
