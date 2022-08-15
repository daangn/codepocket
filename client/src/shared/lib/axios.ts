import axios, { AxiosResponse } from 'axios';

import { BASE_SERVER_URL } from '../constant';

export interface ResponseType<T> extends AxiosResponse {
  data: T;
}

interface ErrorType<T> extends AxiosResponse {
  response: {
    data: T;
  };
}

type NetworkError = ErrorType<{ message: string }>; // 존재하지 않는 경로 등
type ServerError<T = unknown> = ErrorType<T>; // 서버에서 에러 반환 등
export type APIErrorType<T = { message: string }> = NetworkError | ServerError<T>;

const transformResponse = (data: string) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    return { message: (error as Error).message };
  }
};

export const axiosInstance = axios.create({
  transformResponse,
  baseURL: BASE_SERVER_URL,
});
