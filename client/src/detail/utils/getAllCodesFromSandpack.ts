import { filterObjValueWithKey, filterObjWithKey } from './filterObj';

interface GetAllCodesFromSandpack {
  files: any;
  codeName: string;
}

const getAllCodesFromSandpack = ({ files, codeName }: GetAllCodesFromSandpack) => {
  const ROOT_FILE = '/App.tsx';
  const SANDPACK_FILE_CODE = 'code';
  const storyNames = [ROOT_FILE, `/${codeName}`];
  const codes = filterObjValueWithKey(filterObjWithKey(files, storyNames), SANDPACK_FILE_CODE);
  return codes;
};

export default getAllCodesFromSandpack;
