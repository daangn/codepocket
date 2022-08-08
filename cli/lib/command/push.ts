import { to } from 'await-to-js';
import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';

import { pushCodeAPI } from '../api';
import { checkaServerEnv, logger } from '../utils';

const getFileName = (filePath: string) =>
  filePath
    .split('/')
    .reverse()
    .find((p) => !p.includes('index'));

export default async (filePath: string, option: { name?: string }) => {
  const [error] = await to(
    (async () => {
      checkaServerEnv();
      const isExistPath = fs.existsSync(filePath);
      const isPathIsDir = isExistPath && !fs.lstatSync(filePath).isFile();
      if (!isExistPath || isPathIsDir) throw Error('🚨 올바른 파일 경로를 입력해주세요');

      const currentCommandPath = process.env.INIT_CWD || '';
      const code = fs.readFileSync(path.resolve(currentCommandPath, filePath), {
        encoding: 'utf-8',
      });
      const pocketToken = process.env.POCKET_TOKEN || '';
      const codeName = option.name || getFileName(filePath);
      if (codeName === '' || codeName === '.')
        throw Error('🚨 index는 파일명으로 사용불가능해요. -n옵션을 사용해보세요');
      if (!codeName) throw Error('🚨 입력하신 경로에서 파일명을 찾을 수 없어요');

      const { isAnonymous } = await inquirer.prompt({
        name: 'isAnonymous',
        type: 'confirm',
        message: '익명으로 올리시겠어요?',
        default: true,
      });

      await pushCodeAPI({ code, codeName, pocketToken, isAnonymous });
    })(),
  );
  if (error) return logger.error(chalk.yellow(error.message));
  return logger.info(chalk.green('🌟 기여해주셔서 고마워요!'));
};
