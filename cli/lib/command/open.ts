import { execSync } from 'child_process';

import { WEB_DEV_URL, WEB_PROD_URL } from '../env';

export default (author: string, fileName: string) => {
  const baseUrl = process.env.NODE_ENV === 'development' ? WEB_DEV_URL : WEB_PROD_URL;
  const url = `${baseUrl}/detail/${author}/${fileName}`;
  execSync(`open ${url}`, { encoding: 'utf-8' });
};
