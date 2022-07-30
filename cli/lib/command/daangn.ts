import chalk from 'chalk';

export default async () => {
  console.log(chalk.cyan('당근을 흔드셨군요!🥕'));
  console.log(
    chalk.bold.rgb(237, 145, 33).underline('https://github.com/daangn/codepocket/issues') +
      chalk.cyan(' 여기서 이슈를 남겨주세요!'),
  );
  console.log(chalk.gray.strikethrough('테스트는 유저가'));
};
