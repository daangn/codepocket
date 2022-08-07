import { GetCodeNamesResponse } from '@pocket/schema';

export const generateListCodeResponseMock = (
  { isAuthor } = { isAuthor: false },
): GetCodeNamesResponse => ({
  codeNames: ['name1', 'name2', 'name3'],
  authors: isAuthor ? ['name1', 'name2', 'name3'] : [],
  message: '',
});
