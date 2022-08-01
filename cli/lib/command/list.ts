import { to } from 'await-to-js';
import chalk from 'chalk';

import { listCodeAPI } from '../api';
import { checkaServerEnv, logger } from '../utils';

export default async ({ codeName, codeAuthor }: { codeName?: string; codeAuthor?: string }) => {
  const [error, result] = await to(
    (async () => {
      checkaServerEnv();
      const response = await listCodeAPI({
        codeName: codeName || '',
        codeAuthor: codeAuthor || '',
      });
      return response;
    })(),
  );
  if (error) return logger.error(chalk.yellow(error.message));
  const names = result.fileNames.join('\n');
  const authors = result.authors.join(', ');
  return logger.info(`${chalk.green(authors || '모두')}의 코드들입니다🥕\n${names}`);
};
