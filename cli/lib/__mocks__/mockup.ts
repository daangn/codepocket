import { ListCodeAPIResponseData } from 'lib/api';

export const generateListCodeResponseMock = (
  { isAuthor } = { isAuthor: false },
): ListCodeAPIResponseData => ({
  fileNames: ['name1', 'name2', 'name3'],
  authors: isAuthor ? ['name1', 'name2', 'name3'] : [],
});
