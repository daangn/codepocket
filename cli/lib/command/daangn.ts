import chalk from 'chalk';

import { logger } from '../utils';

export default async () => {
  logger.info(chalk.cyan('당근을 흔드셨군요!🥕'));
  logger.info(
    chalk.bold.rgb(237, 145, 33).underline('https://github.com/daangn/codepocket/issues') +
      chalk.cyan(' 여기서 이슈를 남겨주세요!'),
  );
  logger.info(chalk.gray.strikethrough('테스트는 유저가'));
};
