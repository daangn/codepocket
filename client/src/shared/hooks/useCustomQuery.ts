import { QueryFunctionContext, QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { axiosInstance } from '../lib/axios';

type QueryOptions<TResponse> = UseQueryOptions<TResponse, Error, TResponse, QueryKey>;

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
  console.log(options);

  return useQuery<TResponse, Error, TResponse, QueryKey>(
    [url!, params],
    ({ queryKey, meta }) => fetcher({ queryKey, meta }),
    {
      ...commonOptions,
    },
  );
};

export default useCustomQuery;
