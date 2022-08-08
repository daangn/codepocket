import { GetCodeNamesResponse } from '@pocket/schema';

const generateListCodeItem = (key: string, isAnonymous: boolean) => ({
  codeName: `${key}codeName`,
  codeAuthor: `${key}codeAuthor`,
  isAnonymous,
});

export const generateListCodeResponseMock = (
  { isAuthor } = { isAuthor: false },
): GetCodeNamesResponse => ({
  codeInfos: [
    generateListCodeItem(isAuthor ? '' : '1', false),
    generateListCodeItem(isAuthor ? '' : '2', false),
    generateListCodeItem(isAuthor ? '' : '3', true),
  ],
  message: '',
});
