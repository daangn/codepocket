import { to } from 'await-to-js';
import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';

import { pushCodeAPI } from '../api';
import { logger } from '../utils';

const getFileName = (filePath: string) =>
  filePath
    .split('/')
    .reverse()
    .find((p) => !p.includes('index'));

export default async (filePath: string, option: { name?: string }) => {
  const [error] = await to(
    (async () => {
      const isExistPath = fs.existsSync(filePath);
      const isPathIsDir = isExistPath && !fs.lstatSync(filePath).isFile();
      if (!isExistPath || isPathIsDir) throw Error('๐จ ์ฌ๋ฐ๋ฅธ ํ์ผ ๊ฒฝ๋ก๋ฅผ ์๋ ฅํด์ฃผ์ธ์');

      const currentCommandPath = process.env.INIT_CWD || '';
      const code = fs.readFileSync(path.resolve(currentCommandPath, filePath), {
        encoding: 'utf-8',
      });
      const pocketToken = process.env.POCKET_TOKEN || '';
      const codeName = option.name || getFileName(filePath);
      if (codeName === '' || codeName === '.')
        throw Error('๐จ index๋ ํ์ผ๋ช์ผ๋ก ์ฌ์ฉ๋ถ๊ฐ๋ฅํด์. -n์ต์์ ์ฌ์ฉํด๋ณด์ธ์');
      if (!codeName) throw Error('๐จ ์๋ ฅํ์  ๊ฒฝ๋ก์์ ํ์ผ๋ช์ ์ฐพ์ ์ ์์ด์');

      const { isAnonymous } = await inquirer.prompt({
        name: 'isAnonymous',
        type: 'confirm',
        message: '์ต๋ช์ผ๋ก ์ฌ๋ฆฌ์๊ฒ ์ด์?',
        default: true,
      });

      await pushCodeAPI({ code, codeName, pocketToken, isAnonymous });
    })(),
  );
  if (error) return logger.error(chalk.yellow(error.message));
  return logger.info(chalk.green('๐ ๊ธฐ์ฌํด์ฃผ์์ ๊ณ ๋ง์์!'));
};
