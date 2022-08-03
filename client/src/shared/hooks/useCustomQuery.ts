import { QueryFunctionContext, QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { axiosInstance } from '../lib/axios';

type CustomUseQueryOptions<Response> = UseQueryOptions<Response, Error, Response, QueryKey>;

type QueryOptions<Response> = Omit<
  CustomUseQueryOptions<Response>,
  'queryKey' | 'queryFn' | 'initialData'
>;

interface CustomQueryInterface<Response> {
  url: string;
  params?: { [param: string]: string };
  options?: QueryOptions<Response>;
}

const fetcher = async <T>({ queryKey }: QueryFunctionContext): Promise<T> => {
  const [url, params] = queryKey;
  const { data } = await axiosInstance.get(url as string, { params });
  return data;
};

const useCustomQuery = <Response, Error = { message: string }>({
  url,
  params,
  options,
}: CustomQueryInterface<Response>) => {
  const commonOptions: QueryOptions<Response> = { staleTime: 1000000, cacheTime: 1000000 };
  return useQuery<Response, Error, Response, QueryKey>(
    [url!, params],
    ({ queryKey, meta }) => fetcher({ queryKey, meta }),
    {
      ...commonOptions,
      ...options,
    },
  );
};

export default useCustomQuery;
