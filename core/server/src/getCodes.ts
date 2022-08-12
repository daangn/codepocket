import { getCodesRequestValidate, GetCodesResponse } from '@codepocket/schema';
import { SearchCodesParam } from 'types';

export interface GetCodesType<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: GetCodesResponse) => Response;
  searchCodes: (params: SearchCodesParam) => Promise<GetCodesResponse['codes']>;
}

export default async <T, Response>(request: T, modules: GetCodesType<Response>) => {
  if (!getCodesRequestValidate(request)) throw modules.validateErrorFunc();
  const { limit = '5', offset = '0', search = '' } = request.query;

  const searchRegex = new RegExp(search, 'gi');
  const codes = await modules.searchCodes({ searchRegex, offset, limit });

  const isLast = +codes.length < +limit;

  return modules.successResponseFunc({ message: '', codes, isLast });
};
