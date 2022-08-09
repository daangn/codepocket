import { to } from 'await-to-js';
import chalk from 'chalk';
import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';

import { getCodeAuthors, pullCodeAPI } from '../api';
import { logger } from '../utils';

export default async (codeName: string, option: { path?: string }) => {
  const ANONYMOUS = '익명이';

  const [error] = await to(
    (async () => {
      const optionPath = option.path || '.';
      const currentCommandPath = process.env.INIT_CWD || '';

      const authors = await getCodeAuthors({ codeName });
      const anonymousAuthor = authors.find((author) => author.isAnonymous)?.codeAuthor;
      const { selectedAuthor } = await inquirer.prompt({
        name: 'selectedAuthor',
        type: 'list',
        message: '누구의 코드를 가져오시겠어요?',
        choices: authors.map((author) => (author.isAnonymous ? ANONYMOUS : author.codeAuthor)),
      });

      const codeAuthor = selectedAuthor !== ANONYMOUS ? selectedAuthor : anonymousAuthor;
      const code = await pullCodeAPI({ codeAuthor, codeName });
      const myPath = path.resolve(currentCommandPath, optionPath);
      if (!fs.existsSync(myPath)) {
        const [err] = await to((async () => fs.writeFileSync(myPath, code))());
        if (err) throw new Error('🚨 존재하지 않는 경로예요');
        return;
      }

      const newPath = `${myPath}/${codeName}`;
      const noDuplicatedFile = !fs.lstatSync(myPath).isFile() && !fs.existsSync(newPath);
      if (!noDuplicatedFile) throw new Error('🚨 해당 경로에 동일한 이름의 파일이 존재해요');
      fs.writeFileSync(newPath, code);
    })(),
  );
  if (error) return logger.error(chalk.yellow(error.message));
  return logger.info(chalk.green('🌟 코드를 성공적으로 가져왔어요!'));
};
