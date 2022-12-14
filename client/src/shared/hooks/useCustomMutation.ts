import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { APIErrorType, axiosInstance } from '../lib/axios';

export type MethodType = 'POST' | 'DELETE' | 'PUT' | 'UPDATE';

type CustomUseMutationOptions<Response, Error, Variable, Context> = Omit<
  UseMutationOptions<Response, Error, Variable, Context>,
  'mutationKey'
>;

interface CustomMutationInterface<Response, Error, Variable, Context> {
  url: string;
  method: MethodType;
  validator: (res: Response | undefined) => res is Response;
  options?: CustomUseMutationOptions<Response, APIErrorType<Error>, Variable, Context>;
}

const fetcher =
  <Variable>(url: string, method: MethodType) =>
  async (data: Variable) => {
    const response = await axiosInstance({ url, method, data });
    return response.data;
  };

const useCustomMutation = <Response, Error, Variable, Context = unknown>({
  url,
  method,
  options,
}: CustomMutationInterface<Response, Error, Variable, Context>) => {
  const { data, isSuccess, ...others } = useMutation<
    Response,
    APIErrorType<Error>,
    Variable,
    Context
  >(fetcher<Variable>(url, method), { ...options });

  return { data, isSuccess, ...others };
};

export default useCustomMutation;
