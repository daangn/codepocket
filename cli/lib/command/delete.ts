import { to } from 'await-to-js';
import chalk from 'chalk';

import { deleteCodeAPI } from '../api';

export default async (codeName: string) => {
  const pocketToken = process.env.POCKET_TOKEN || '';
  const [error] = await to(deleteCodeAPI({ codeName, pocketToken }));

  if (error) return console.error(chalk.yellow(error.message));
  return console.log(chalk.green('🌟 저장소에서 코드가 삭제되었어요!'));
};
