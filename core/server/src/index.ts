import { SlackConfig } from 'slack';

import createStory, { CreateStoryType } from './createStory';
import createUser, { CreateUserType } from './createUser';
import deleteCode, { DeleteCodeType } from './deleteCode';
import deleteCodeById, { DeleteCodeByIdType } from './deleteCodeById';
import deleteStory, { DeleteStoryType } from './deleteStory';
import getCode, { GetCodeType } from './getCode';
import getCodeAuthors, { GetCodeAuthorsType } from './getCodeAuthors';
import getCodeNames, { GetCodeNamesType } from './getCodeNames';
import getCodes, { GetCodesType } from './getCodes';
import getStoryCode, { GetStoryCodeType } from './getStoryCode';
import getStoryNames, { GetStoryNamesType } from './getStoryNames';
import pullCode, { PullCodeType } from './pullCode';
import pushCode, { PushCodeType } from './pushCode';
import updateStory, { UpdateStoryType } from './updateStory';
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
      createStory(request, { validateError, ...modules }),
    createUser: <T>(request: T, modules: CreateUserType<Response>) =>
      createUser(request, { validateError, ...modules }),
    deleteCode: <T>(request: T, modules: DeleteCodeType<Response>) =>
      deleteCode(request, { slackConfig, validateError, ...modules }),
    deleteCodeById: <T>(request: T, modules: DeleteCodeByIdType<Response>) =>
      deleteCodeById(request, { slackConfig, validateError, ...modules }),
    deleteStory: <T>(request: T, modules: DeleteStoryType<Response>) =>
      deleteStory(request, { validateError, ...modules }),
    getCode: <T>(request: T, modules: GetCodeType<Response>) =>
      getCode(request, { validateError, ...modules }),
    getCodeAuthors: <T>(request: T, modules: GetCodeAuthorsType<Response>) =>
      getCodeAuthors(request, { validateError, ...modules }),
    getCodeNames: <T>(request: T, modules: GetCodeNamesType<Response>) =>
      getCodeNames(request, { validateError, ...modules }),
    getCodes: <T>(request: T, modules: GetCodesType<Response>) =>
      getCodes(request, { validateError, ...modules }),
    getStoryCode: <T>(request: T, modules: GetStoryCodeType<Response>) =>
      getStoryCode(request, { validateError, ...modules }),
    getStoryNames: <T>(request: T, modules: GetStoryNamesType<Response>) =>
      getStoryNames(request, { validateError, ...modules }),
    pullCode: <T>(request: T, modules: PullCodeType<Response>) =>
      pullCode(request, { validateError, ...modules }),
    pushCode: <T>(request: T, modules: PushCodeType<Response>) =>
      pushCode(request, { slackAPIError, slackConfig, validateError, ...modules }),
    updateStory: <T>(request: T, modules: UpdateStoryType<Response>) =>
      updateStory(request, { validateError, ...modules }),
    verifyUser: <T>(request: T, modules: VerifyUserType<Response>) =>
      verifyUser(request, { validateError, ...modules }),
  };
};
