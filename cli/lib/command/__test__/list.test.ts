// TODO: mocking로직 수정이 필요할 듯
import chalk from 'chalk';

import { listCodeHandler } from '../../__mocks__/handlers';
import { generateListCodeResponseMock } from '../../__mocks__/mockup';
import server from '../../__mocks__/server';
import { logger } from '../../utils';
import listCommand from '../list';

jest.mock('chalk', () => ({
  yellow: jest.fn(),
  green: jest.fn(),
}));

const chalkYellowMock = chalk.yellow as jest.MockedFunction<typeof chalk.yellow>;
const chalkGreenMock = chalk.green as jest.MockedFunction<typeof chalk.green>;
chalkYellowMock.mockImplementation((value: unknown) => value as string);
chalkGreenMock.mockImplementation((value: unknown) => value as string);

const consoleErrorSpy = jest.spyOn(logger, 'error');
const consoleLogSpy = jest.spyOn(logger, 'info');

beforeEach(() => {
  consoleErrorSpy.mockClear();
  consoleLogSpy.mockClear();
});

it('작성자를 설정하지 않았을 경우(author option을 주지 않았을 때), 정상 출력 테스트', async () => {
  const { codeInfos } = generateListCodeResponseMock();
  const names = codeInfos
    .map((code) => `${code.isAnonymous ? '' : code.codeAuthor}/${code.codeName}`)
    .join('\r\n');
  const expectedLog = `모두의 코드들입니다🥕\n${names}`;

  await listCommand({});
  expect(consoleLogSpy).toBeCalledWith(expectedLog);
  expect(consoleLogSpy).toBeCalledTimes(1);
});

it('작성자만 설정했을 경우(author option을 주었을 때), 정상 출력 테스트', async () => {
  server.use(listCodeHandler('NO', true));
  const { codeInfos } = generateListCodeResponseMock({ isAuthor: true });
  const [author] = [
    ...new Set(codeInfos.filter((code) => !code.isAnonymous).map((code) => code.codeAuthor)),
  ];
  const names = codeInfos
    .map((code) => `${code.isAnonymous ? '' : code.codeAuthor}/${code.codeName}`)
    .join('\r\n');
  const expectedLog = `${author}의 코드들입니다🥕\n${names}`;

  await listCommand({ author: 'shell', fileName: 'code' });
  expect(consoleLogSpy).toBeCalledWith(expectedLog);
  expect(consoleLogSpy).toBeCalledTimes(1);
});

it('파일명만 설정했을 경우(fileName option을 주었을 때), 정상 출력 테스트', async () => {
  const { codeInfos } = generateListCodeResponseMock();
  const names = codeInfos
    .map((code) => `${code.isAnonymous ? '' : code.codeAuthor}/${code.codeName}`)
    .join('\r\n');
  const expectedLog = `모두의 코드들입니다🥕\n${names}`;

  await listCommand({ author: 'shell', fileName: 'code' });
  expect(consoleLogSpy).toBeCalledWith(expectedLog);
  expect(consoleLogSpy).toBeCalledTimes(1);
});

it('서버 에러일 경우, 에러 테스트', async () => {
  server.use(listCodeHandler('SERVER'));
  const expectedError = '서버 에러 발생';

  await listCommand({});
  expect(consoleErrorSpy).toBeCalledWith(expectedError);
  expect(consoleErrorSpy).toBeCalledTimes(1);
});

it('네트워크 에러일 경우, 에러 테스트', async () => {
  server.use(listCodeHandler('NETWORK'));
  const expectedError = '네트워크 에러 발생';

  await listCommand({});
  expect(consoleErrorSpy).toBeCalledWith(expectedError);
  expect(consoleErrorSpy).toBeCalledTimes(1);
});
