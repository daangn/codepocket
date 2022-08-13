import { SlackConfig } from 'slack';

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
  validateError: Response;
  slackAPIError?: Response;
  slackConfig?: SlackConfig;
}

export const createConnector = <Response>({
  validateError,
  slackAPIError,
  slackConfig,
}: ConnectorType<Response>) => {
  return {
    createStory: <T>(request: T, modules: CreateStoryType<Response>) =>
      createStory(request, { ...modules, validateError }),
    createUser: <T>(request: T, modules: CreateUserType<Response>) =>
      createUser(request, { ...modules, validateError }),
    deleteCode: <T>(request: T, modules: DeleteCodeType<Response>) =>
      deleteCode(request, { ...modules, slackConfig, validateError }),
    getCode: <T>(request: T, modules: GetCodeType<Response>) =>
      getCode(request, { ...modules, validateError }),
    getCodeAuthors: <T>(request: T, modules: GetCodeAuthorsType<Response>) =>
      getCodeAuthors(request, { ...modules, validateError }),
    getCodeNames: <T>(request: T, modules: GetCodeNamesType<Response>) =>
      getCodeNames(request, { ...modules, validateError }),
    getCodes: <T>(request: T, modules: GetCodesType<Response>) =>
      getCodes(request, { ...modules, validateError }),
    getStoryCode: <T>(request: T, modules: GetStoryCodeType<Response>) =>
      getStoryCode(request, { ...modules, validateError }),
    getStoryNames: <T>(request: T, modules: GetStoryNamesType<Response>) =>
      getStoryNames(request, { ...modules, validateError }),
    pullCode: <T>(request: T, modules: PullCodeType<Response>) =>
      pullCode(request, { ...modules, validateError }),
    pushCode: <T>(request: T, modules: PushCodeType<Response>) =>
      pushCode(request, { ...modules, slackAPIError, slackConfig, validateError }),
    verifyUser: <T>(request: T, modules: VerifyUserType<Response>) =>
      verifyUser(request, { ...modules, validateError }),
  };
};
