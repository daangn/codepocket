import chalk from 'chalk';

import { deleteCodeHandler } from '../../__mocks__/handlers';
import server from '../../__mocks__/server';
import deleteCommand from '../delete';

jest.mock('chalk', () => ({
  yellow: jest.fn(),
  green: jest.fn(),
}));

const consoleErrorSpy = jest.spyOn(console, 'error');
const consoleLogSpy = jest.spyOn(console, 'log');

beforeEach(() => {
  consoleErrorSpy.mockClear();
  consoleLogSpy.mockClear();
});

const chalkYellowMock = chalk.yellow as jest.MockedFunction<typeof chalk.yellow>;
const chalkGreenMock = chalk.green as jest.MockedFunction<typeof chalk.green>;
chalkYellowMock.mockImplementation((value: unknown) => value as string);
chalkGreenMock.mockImplementation((value: unknown) => value as string);

const FILENAME = 'FILENAME';

it('삭제가 정상적으로 진행될 경우, 테스트', async () => {
  const expectedLog = '🌟 저장소에서 코드가 삭제되었어요!';
  await deleteCommand(FILENAME);
  expect(consoleLogSpy).toBeCalledWith(expectedLog);
  expect(consoleLogSpy).toBeCalledTimes(1);
});

it('서버에러일 경우, 에러 테스트', async () => {
  server.use(deleteCodeHandler('SERVER'));
  const expectedError = '서버 에러 발생';

  await deleteCommand(FILENAME);
  expect(consoleErrorSpy).toBeCalledWith(expectedError);
  expect(consoleErrorSpy).toBeCalledTimes(1);
});

it('네트워크 에러일 경우, 에러 테스트', async () => {
  server.use(deleteCodeHandler('NETWORK'));
  const expectedError = '네트워크 에러 발생';

  await deleteCommand(FILENAME);
  expect(consoleErrorSpy).toBeCalledWith(expectedError);
  expect(consoleErrorSpy).toBeCalledTimes(1);
});
