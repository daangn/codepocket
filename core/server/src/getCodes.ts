import { getCodesRequestValidate, GetCodesResponse } from '@pocket/schema';

export interface SearchCodesParam {
  searchRegex?: RegExp;
  limit: string;
  offset: string;
}

interface GetCodes<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: GetCodesResponse) => Response;
  searchCodes: (params: SearchCodesParam) => Promise<GetCodesResponse['codes']>;
}

export default async <T, Response>(request: T, modules: GetCodes<Response>) => {
  if (!getCodesRequestValidate(request)) throw modules.validateErrorFunc();
  const { limit = '5', offset = '0', search = '' } = request.query;

  const searchRegex = new RegExp(search, 'gi');
  const codes = await modules.searchCodes({ searchRegex, offset, limit });

  const isLast = +codes.length < +limit;

  return modules.successResponseFunc({ message: '', codes, isLast });
};
