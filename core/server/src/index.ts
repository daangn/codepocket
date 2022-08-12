import createStory, { CreateStoryType } from './createStory';
import createUser, { CreateUserType } from './createUser';
import deleteCode, { DeleteCodeType } from './deleteCode';
import getCode, { GetCodeType } from './getCode';
import getCodeAuthors, { GetCodeAuthorsType } from './getCodeAuthors';
import getCodeNames, { GetCodeNamesType } from './getCodeNames';
import getCodes, { GetCodesType } from './getCodes';
import getStoryCode, { GetStoryCodeType } from './getStoryCode';
import getStoryNames, { GetStoryNamesType } from './getStoryNames';
import pullCode, { PullCodeType } from './pullCode';
import pushCode, { PushCodeType } from './pushCode';
import verifyUser, { VerifyUserType } from './verifyUser';

export * as Types from './types';

interface ConnectorType<Response> {
  validateErrorFunc: () => Response;
}

export const connector = <Response>({ validateErrorFunc }: ConnectorType<Response>) => {
  return {
    createStory: <T>(request: T, modules: CreateStoryType<Response>) =>
      createStory(request, { ...modules, validateErrorFunc }),
    createUser: <T>(request: T, modules: CreateUserType<Response>) =>
      createUser(request, { ...modules, validateErrorFunc }),
    deleteCode: <T>(request: T, modules: DeleteCodeType<Response>) =>
      deleteCode(request, { ...modules, validateErrorFunc }),
    getCode: <T>(request: T, modules: GetCodeType<Response>) =>
      getCode(request, { ...modules, validateErrorFunc }),
    getCodeAuthors: <T>(request: T, modules: GetCodeAuthorsType<Response>) =>
      getCodeAuthors(request, { ...modules, validateErrorFunc }),
    getCodeNames: <T>(request: T, modules: GetCodeNamesType<Response>) =>
      getCodeNames(request, { ...modules, validateErrorFunc }),
    getCodes: <T>(request: T, modules: GetCodesType<Response>) =>
      getCodes(request, { ...modules, validateErrorFunc }),
    getStoryCode: <T>(request: T, modules: GetStoryCodeType<Response>) =>
      getStoryCode(request, { ...modules, validateErrorFunc }),
    getStoryNames: <T>(request: T, modules: GetStoryNamesType<Response>) =>
      getStoryNames(request, { ...modules, validateErrorFunc }),
    pullCode: <T>(request: T, modules: PullCodeType<Response>) =>
      pullCode(request, { ...modules, validateErrorFunc }),
    pushCode: <T>(request: T, modules: PushCodeType<Response>) =>
      pushCode(request, { ...modules, validateErrorFunc }),
    verifyUser: <T>(request: T, modules: VerifyUserType<Response>) =>
      verifyUser(request, { ...modules, validateErrorFunc }),
  };
};
