import { to } from 'await-to-js';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

import { pullCodeAPI } from '../api';
import { checkaServerEnv } from './utils';

export default async (codeAuthor: string, codeName: string, option: { path?: string }) => {
  const [error] = await to(
    (async () => {
      checkaServerEnv();
      const optionPath = option.path || '.';
      const currentCommandPath = process.env.INIT_CWD || '';

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
  if (error) return console.error(chalk.yellow(error.message));
  return console.log(chalk.green('🌟 코드를 성공적으로 가져왔어요!'));
};
