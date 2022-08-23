import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';

import { APIErrorType, axiosInstance } from '../lib/axios';

type ParamsType = { [param: string]: string | number | undefined };
interface useCustomInfiniteQueryInterface {
  url: string;
  params?: ParamsType;
}

interface Fetcher<Response> {
  data: Response;
  nextPage: number;
  prevPage: number;
}

const fetcher = async <T>({
  queryKey,
  pageParam = 0,
}: QueryFunctionContext<[string, ParamsType?]>): Promise<Fetcher<T>> => {
  const [url, params] = queryKey;
  const { data } = await axiosInstance.get(url, { params: { ...params, offset: pageParam } });
  return { data, nextPage: pageParam + 1, prevPage: pageParam - 1 };
};

const useCustomInfiniteQuery = <Response>({ url, params }: useCustomInfiniteQueryInterface) => {
  const res = useInfiniteQuery<
    Fetcher<Response>,
    APIErrorType,
    Fetcher<Response>,
    [string, ParamsType?]
  >([url!, params], ({ queryKey, meta, pageParam }) => fetcher({ queryKey, meta, pageParam }), {
    getNextPageParam: (lastPage) => lastPage.nextPage,
    getPreviousPageParam: (firstPage) => firstPage.prevPage,
  });

  return res;
};

export default useCustomInfiniteQuery;
