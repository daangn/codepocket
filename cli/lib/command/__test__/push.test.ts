import chalk from 'chalk';
import fs from 'fs';

import { pushCodeHandler } from '../../__mocks__/handlers';
import server from '../../__mocks__/server';
import { logger } from '../../utils';
import pushCommand from '../push';

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
const testFilePath = `${process.env.INIT_CWD}/push-test.txt`;

beforeEach(() => {
  consoleErrorSpy.mockClear();
  consoleLogSpy.mockClear();
});

beforeAll(() => {
  fs.writeFileSync(testFilePath, 'test');
});

afterAll(() => {
  fs.unlinkSync(testFilePath);
});

it('경로가 올바르지 않은 경우, 경로 에러 테스트', async () => {
  const expectedError = '🚨 올바른 파일 경로를 입력해주세요';

  const filePath = './asdf/asdfasdfasdfasdf';
  await pushCommand(filePath, {});
  expect(consoleErrorSpy).toBeCalledWith(expectedError);
  expect(consoleErrorSpy).toBeCalledTimes(1);
});

describe('경로가 올바른 경우', () => {
  it('경로가 파일인 경우, 성공 테스트', async () => {
    const expectedLog = '🌟 기여해주셔서 고마워요!';

    const filePath = testFilePath;
    await pushCommand(filePath, {});
    expect(consoleLogSpy).toBeCalledWith(expectedLog);
    expect(consoleLogSpy).toBeCalledTimes(1);
  });

  it('option으로 이름이 주어질 경우, 성공 테스트', async () => {
    const expectedLog = '🌟 기여해주셔서 고마워요!';

    const filePath = testFilePath;
    await pushCommand(filePath, { name: 'name' });
    expect(consoleLogSpy).toBeCalledWith(expectedLog);
    expect(consoleLogSpy).toBeCalledTimes(1);
  });

  it('경로가 폴더인 경우, 경로 에러 테스트', async () => {
    const expectedError = '🚨 올바른 파일 경로를 입력해주세요';

    const filePath = '.';
    await pushCommand(filePath, {});
    expect(consoleErrorSpy).toBeCalledWith(expectedError);
    expect(consoleErrorSpy).toBeCalledTimes(1);
  });
});

it('서버에러일 경우, 에러 테스트', async () => {
  server.use(pushCodeHandler('SERVER'));
  const expectedError = '서버 에러 발생';

  const filePath = testFilePath;
  await pushCommand(filePath, {});
  expect(consoleErrorSpy).toBeCalledWith(expectedError);
  expect(consoleErrorSpy).toBeCalledTimes(1);
});

it('네트워크 에러일 경우, 에러 테스트', async () => {
  server.use(pushCodeHandler('NETWORK'));
  const expectedError = '네트워크 에러 발생';

  const filePath = testFilePath;
  await pushCommand(filePath, {});
  expect(consoleErrorSpy).toBeCalledWith(expectedError);
  expect(consoleErrorSpy).toBeCalledTimes(1);
});
