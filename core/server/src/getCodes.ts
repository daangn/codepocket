import { getCodesRequestValidate, GetCodesResponse } from '@codepocket/schema';
import { SearchCodesParam } from 'types';

export interface GetCodesType<Response> {
  /* validator에러 */
  validateError?: Response;
  /* 성공했을 경우 */
  successResponseFunc: (body: GetCodesResponse) => Response;

  /* 검색 조건들로 코드들을 검색하는 함수 */
  searchCodes: (params: SearchCodesParam) => Promise<GetCodesResponse['codes']>;
}

export default async <T, Response>(request: T, modules: GetCodesType<Response>) => {
  if (!getCodesRequestValidate(request)) throw modules.validateError;
  const { limit = '5', offset = '0', search = '' } = request.query;

  const searchRegex = new RegExp(search, 'gi');
  const codes = await modules.searchCodes({
    searchRegex,
    offset: Number(offset),
    limit: Number(limit),
  });

  const isLast = codes.length < +limit;

  return modules.successResponseFunc({ message: '', codes, isLast });
};
