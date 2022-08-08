import { to } from 'await-to-js';
import chalk from 'chalk';

import { listCodeAPI } from '../api';
import { checkaServerEnv, logger } from '../utils';

export default async ({ fileName, author }: { fileName?: string; author?: string }) => {
  const [error, result] = await to(
    (async () => {
      checkaServerEnv();
      const response = await listCodeAPI({
        codeName: fileName || '',
        codeAuthor: author || '',
      });
      return response;
    })(),
  );
  if (error) return logger.error(chalk.yellow(error.message));

  const authors = [
    ...new Set(result.codeInfos.filter((code) => !code.isAnonymous).map((code) => code.codeAuthor)),
  ];

  const codeInfoList = result.codeInfos
    .map((code) => `${code.isAnonymous ? '' : code.codeAuthor}/${code.codeName}`)
    .join('\r\n');
  return logger.info(
    `${chalk.green(authors.length === 1 ? authors[0] : '모두')}의 코드들입니다🥕\n${codeInfoList}`,
  );
};
