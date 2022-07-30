import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { APIErrorType, axiosInstance } from '../lib/axios';

interface UseCustomQuery {
  url: string;
  params?: { [param: string]: string };
  suspense?: boolean;
  useErrorBoundary?: boolean;
  enabled?: boolean;
}

const fetcher = async <T>({ queryKey }: QueryFunctionContext): Promise<T> => {
  const [url, params] = queryKey;
  const { data } = await axiosInstance.get(url as string, { params });
  return data;
};

const useCustomQuery = <ResData, ErrorType = { message: string }>({
  url,
  params,
  ...config
}: UseCustomQuery) =>
  useQuery<ResData, APIErrorType<ErrorType>>(
    [url!, params],
    ({ queryKey, meta }) => fetcher({ queryKey, meta }),
    { ...config, staleTime: 10000000, cacheTime: 10000000 },
  );

export default useCustomQuery;
