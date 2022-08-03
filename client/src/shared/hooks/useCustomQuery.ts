import { QueryFunctionContext, QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { axiosInstance } from '../lib/axios';

type CustomUseQueryOptions<Response> = UseQueryOptions<
  AxiosResponse<Response>,
  AxiosError<Error>,
  AxiosResponse<Response>,
  QueryKey
>;

type QueryOptionType<Response> = Omit<
  CustomUseQueryOptions<Response>,
  'queryKey' | 'queryFn' | 'initialData'
>;

interface CustomQueryInterface<Response> {
  url: string;
  params?: { [param: string]: string };
  options?: QueryOptionType<Response>;
}

const fetcher = async <T>({ queryKey }: QueryFunctionContext): Promise<T> => {
  const [url, params] = queryKey;
  const { data } = await axiosInstance.get(url as string, { params });
  return data;
};

const useCustomQuery = <Response, ErrorType = { message: string }>({
  url,
  params,
  options,
}: CustomQueryInterface<Response>) => {
  const commonOptions: QueryOptionType<Response> = { staleTime: 1000000, cacheTime: 1000000 };
  return useQuery<Response, ErrorType, Response, QueryKey>(
    [url!, params],
    ({ queryKey, meta }) => fetcher({ queryKey, meta }),
    {
      ...commonOptions,
      ...options,
    },
  );
};

export default useCustomQuery;
