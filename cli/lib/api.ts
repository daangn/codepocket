import {
  DeleteCodeRequest,
  GetCodeAuthorsRequest,
  GetCodeAuthorsResponse,
  GetCodeNamesRequest,
  GetCodeNamesResponse,
  PullCodeRequest,
  PushCodeRequest,
} from '@codepocket/schema';
import { to } from 'await-to-js';
import axios, { AxiosResponse } from 'axios';

import { getBaseUrl } from './utils';

// Response
interface ResponseType<T> extends AxiosResponse {
  data: T;
}
export type DefaultResponseData = { message: string };
export type PullCodeAPIResponseData = { code: string };

// Error
interface ErrorType<T> extends AxiosResponse {
  response: {
    data: T;
  };
}

export type ServerResponseData = { message: string };
export type NetworkResponseData = string;
export type ServerError = ErrorType<ServerResponseData>;
export type NetworkError = ErrorType<NetworkResponseData>;
type ResponseError = ServerError | NetworkError;

const isNetworkError = (err: ResponseError): err is NetworkError =>
  typeof err.response.data === 'string';

const baseURL = getBaseUrl();
const axiosInstance = axios.create({ baseURL });

export const pushCodeAPI = async (body: PushCodeRequest['body']) => {
  const [err, res] = await to<ResponseType<DefaultResponseData>, ResponseError>(
    axiosInstance.post('/code', body),
  );
  if (err) throw new Error(isNetworkError(err) ? err.response.data : err.response.data.message);
  return res.data.message;
};

export const pullCodeAPI = async (query: PullCodeRequest['query']) => {
  const [err, res] = await to<ResponseType<PullCodeAPIResponseData>, ResponseError>(
    axiosInstance.get(`/code?codeName=${query.codeName}&codeAuthor=${query.codeAuthor}`),
  );
  if (err && !err.response)
    throw new Error('서버와 연결할 수 없어요. POCKET_TOKEN 환경변수를 확인해주세요.');
  if (err) throw new Error(isNetworkError(err) ? err.response.data : err.response.data.message);
  return res.data.code;
};

export const getCodeAuthors = async (query: GetCodeAuthorsRequest['query']) => {
  const [err, res] = await to<ResponseType<GetCodeAuthorsResponse>, ResponseError>(
    axiosInstance.get(`/code/authors?codeName=${query.codeName}`),
  );
  if (err && !err.response)
    throw new Error('서버와 연결할 수 없어요. POCKET_TOKEN 환경변수를 확인해주세요.');
  if (err) throw new Error(isNetworkError(err) ? err.response.data : err.response.data.message);
  return res.data.codeAuthors;
};

export const listCodeAPI = async (body: GetCodeNamesRequest['query']) => {
  const [err, res] = await to<ResponseType<GetCodeNamesResponse>, ResponseError>(
    axiosInstance.get(`/code/list?codeAuthor=${body.codeAuthor}&codeName=${body.codeName}`),
  );
  if (err && !err.response)
    throw new Error('서버와 연결할 수 없어요. POCKET_TOKEN 환경변수를 확인해주세요.');
  if (err) throw new Error(isNetworkError(err) ? err.response.data : err.response.data.message);
  return res.data;
};

export const deleteCodeAPI = async (body: DeleteCodeRequest['body']) => {
  const [err, res] = await to<ResponseType<DefaultResponseData>, ResponseError>(
    axiosInstance.post('/code/delete', body),
  );
  if (err && !err.response)
    throw new Error('서버와 연결할 수 없어요. POCKET_TOKEN 환경변수를 확인해주세요.');
  if (err) throw new Error(isNetworkError(err) ? err.response.data : err.response.data.message);
  return res.data;
};
