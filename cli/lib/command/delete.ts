import { to } from 'await-to-js';
import chalk from 'chalk';

import { deleteCodeAPI } from '../api';
import { checkaServerEnv, logger } from '../utils';

export default async (codeName: string) => {
  const [error] = await to(
    (async () => {
      checkaServerEnv();
      const pocketToken = process.env.POCKET_TOKEN || '';
      await to(deleteCodeAPI({ codeName, pocketToken }));
    })(),
  );

  if (error) return logger.error(chalk.yellow(error.message));
  return logger.info(chalk.green('🌟 저장소에서 코드가 삭제되었어요!'));
};
