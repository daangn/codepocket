import { pullCodeRequestValidate, PullCodeResponse } from '@pocket/schema';
import { CodeInfo } from 'types';

interface PullCodeType<Response> {
  validateErrorFunc: () => Response;
  successResponseFunc: (body: PullCodeResponse) => Response;
  getCode: (params: CodeInfo) => Promise<string>;
}

export default async <T, Response>(request: T, modules: PullCodeType<Response>) => {
  if (!pullCodeRequestValidate(request)) throw modules.validateErrorFunc();
  const { codeName, codeAuthor } = request.query;

  const code = await modules.getCode({ codeAuthor, codeName });

  return modules.successResponseFunc({ code, message: '' });
};
