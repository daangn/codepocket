import { Command, program } from 'commander';

import packageJSON from '../package.json' assert { type: 'json' }; // eslint-disable-line
import DaangnCommandAction from './command/daangn';
import deleteCommandAction from './command/delete';
import listCommandAction from './command/list';
import openCommandAction from './command/open';
import pullCommandAction from './command/pull';
import pushCommandAction from './command/push';

const pushCommand = new Command('push')
  .description('인자로 입력받은 경로의 코드를 codepocket에 추가해요')
  .argument('<path>', '올리고 싶은 코드의 경로를 입력해주세요')
  .option('-n, --name <name>', '파일의 이름을 직접 설정하고 싶으시면 입력해주세요')
  .action(pushCommandAction);

const pullCommand = new Command('pull')
  .description('입력받은 개발자의 코드를 codepocket에서 가져와요. 저장될 경로를 지정할 수 있어요')
  .argument('<author>', '코드를 작성한 사람을 입력해주세요')
  .argument('<codename>', '코드이름을 입력해주세요')
  .option('-p, --path <path>', '코드가 복사될 경로를 입력해주세요')
  .action(pullCommandAction);

const listCommand = new Command('list')
  .description('저장된 파일명들을 가져와요. 작성자를 지정할 수 있어요')
  .option('-a, --author <author>', '해당 작성자가 작성한 파일명들을 가져올 수 있어요')
  .option('-f, --fileName <fileName>', '입력한 글자가 포함된 파일명들을 가져올 수 있어요')
  .action(listCommandAction);

const deleteCommand = new Command('delete')
  .description('자신이 올린 파일을 삭제해요')
  .argument('<fileName>', '삭제할 파일 이름을 입력해요')
  .action(deleteCommandAction);

const openCommand = new Command('open')
  .argument('<author>', '저자를 입력해주세요')
  .argument('<fileName>', '파일명을 입력해주세요')
  .action(openCommandAction);

const daangnCommand = new Command('🥕🥕')
  .description('불만이 있으면 흔들어주세요!')
  .action(DaangnCommandAction);

program.helpOption('-h, --help', '도와주세요😥');
program.version(packageJSON.version, '-v, --version', '현재 버전 보기');
program.description('여러분의 코드를 공유해봐요!\n불만이 있다면 🥕을 흔들어 주세요!');
program.addCommand(pushCommand);
program.addCommand(pullCommand);
program.addCommand(listCommand);
program.addCommand(deleteCommand);
program.addCommand(openCommand);
program.addCommand(daangnCommand);
program.parseAsync(process.argv);
