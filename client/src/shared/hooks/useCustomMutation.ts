import { useMutation } from '@tanstack/react-query';

import { APIErrorType, axiosInstance } from '../lib/axios';

export type MethodType = 'POST' | 'DELETE' | 'PUT' | 'UPDATE';

interface UseCustomMutation<ResData, ErrorType, VarType> {
  url: string;
  method: MethodType;
  useErrorBoundary?: boolean;
  onSuccess?: (data: ResData, variable: VarType) => void;
  onError?: (data: APIErrorType<ErrorType>, variable: VarType) => void;
}

const fetcher =
  <VarType>(url: string, method: MethodType) =>
  async (data: VarType) => {
    const response = await axiosInstance({ url, method, data });
    return response.data;
  };

const useCustomMutation = <ResData, ErrorType, VarType>({
  url,
  method,
  onError,
  onSuccess,
  ...mutationProps
}: UseCustomMutation<ResData, ErrorType, VarType>) =>
  useMutation<ResData, APIErrorType<ErrorType>, VarType>(fetcher<VarType>(url, method), {
    onError,
    onSuccess,
    ...mutationProps,
  });

export default useCustomMutation;
