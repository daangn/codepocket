import { QueryFunctionContext, QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { axiosInstance } from '../lib/axios';

type QueryOptions<Response> = Omit<UseQueryOptions<Response, Error, Response, QueryKey>, ''> & {
  initialData?: () => undefined;
};

interface CustomQueryInterface<Response> {
  url: string;
  params?: { [param: string]: string };
  validator: (res: Response | undefined) => res is Response;
  options?: QueryOptions<Response>;
}

const fetcher = async <T>({ queryKey }: QueryFunctionContext): Promise<T> => {
  const [url, params] = queryKey;
  const { data } = await axiosInstance.get(url as string, { params });
  return data;
};

const useCustomQuery = <Response>({ url, params, options }: CustomQueryInterface<Response>) => {
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
