import { QueryFunctionContext, QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { axiosInstance } from '../lib/axios';

type QueryOptions<TResponse> = Omit<UseQueryOptions<TResponse, Error, TResponse, QueryKey>, ''> & {
  initialData?: () => undefined;
};

interface CustomQueryInterface<TResponse> {
  url: string;
  params?: { [param: string]: string };
  options?: QueryOptions<TResponse>;
}

const fetcher = async <T>({ queryKey }: QueryFunctionContext): Promise<T> => {
  const [url, params] = queryKey;
  const { data } = await axiosInstance.get(url as string, { params });
  return data;
};

const useCustomQuery = <TResponse>({ url, params, options }: CustomQueryInterface<TResponse>) => {
  const commonOptions: QueryOptions<TResponse> = { staleTime: 1000000, cacheTime: 1000000 };
  return useQuery<TResponse, Error, TResponse, QueryKey>(
    [url!, params],
    ({ queryKey, meta }) => fetcher({ queryKey, meta }),
    {
      ...commonOptions,
      ...options,
    },
  );
};

export default useCustomQuery;
