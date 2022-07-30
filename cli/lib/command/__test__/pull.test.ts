import chalk from 'chalk';
import fs from 'fs';

import { pullCodeHandler } from '../../__mocks__/handlers';
import server from '../../__mocks__/server';
import pullCommand from '../pull';

jest.mock('chalk', () => ({
  yellow: jest.fn(),
  green: jest.fn(),
}));

const chalkYellowMock = chalk.yellow as jest.MockedFunction<typeof chalk.yellow>;
const chalkGreenMock = chalk.green as jest.MockedFunction<typeof chalk.green>;
chalkYellowMock.mockImplementation((value: unknown) => value as string);
chalkGreenMock.mockImplementation((value: unknown) => value as string);

const consoleErrorSpy = jest.spyOn(console, 'error');
const consoleLogSpy = jest.spyOn(console, 'log');

const author = 'author';
const fileName = 'pull-test.txt';
const folderName = 'testfolder';
const filePath = `${process.env.INIT_CWD}/${fileName}`;
const folderPath = `${process.env.INIT_CWD}/${folderName}`;
const filePathInFolder = `${folderPath}/${fileName}`;

beforeAll(() => {
  fs.mkdirSync(folderPath);
});

beforeEach(() => {
  consoleErrorSpy.mockClear();
  consoleLogSpy.mockClear();
});

afterAll(() => {
  fs.rmdirSync(folderPath);
});

describe('저장하고자 하는 경로를 설정하지 않았을 경우(path option이 없을 때)', () => {
  it('현재 디렉토리에 동일한 이름의 파일이 있을 경우, 중복 이름 에러 테스트', async () => {
    fs.writeFileSync(filePath, 'text');
    const expectedError = '🚨 해당 경로에 동일한 이름의 파일이 존재해요';

    await pullCommand(author, fileName, {});
    expect(consoleErrorSpy).toBeCalledWith(expectedError);
    expect(consoleErrorSpy).toBeCalledTimes(1);
    fs.unlinkSync(filePath);
  });

  it('현재 디렉토리에 동일한 이름의 파일이 없을 경우, 파일 생성 성공 테스트', async () => {
    const expectedLog = '🌟 코드를 성공적으로 가져왔어요!';

    await pullCommand(author, fileName, {});
    expect(consoleLogSpy).toBeCalledWith(expectedLog);
    expect(consoleLogSpy).toBeCalledTimes(1);
    fs.unlinkSync(filePath);
  });
});

describe('저장하고 하는 경로를 설정했을 경우(path option을 주었을 때)', () => {
  describe('저장하고자 하는 경로가 존재하는 폴더일 경우', () => {
    it('폴더 안에 입력한 파일명과 동일한 이름을 가지는 파일이 있을 경우, 중복 이름 에러 테스트', async () => {
      fs.writeFileSync(filePathInFolder, 'text');
      const expectedError = '🚨 해당 경로에 동일한 이름의 파일이 존재해요';

      await pullCommand(author, fileName, { path: filePathInFolder });
      expect(consoleErrorSpy).toBeCalledWith(expectedError);
      expect(consoleErrorSpy).toBeCalledTimes(1);
      fs.unlinkSync(filePathInFolder);
    });

    it('폴더 안에 입력한 파일명과 동일한 이름을 가지는 파일이 없을 경우, 파일 생성 성공 테스트', async () => {
      const expectedLog = '🌟 코드를 성공적으로 가져왔어요!';

      await pullCommand(author, fileName, { path: folderPath });
      expect(consoleLogSpy).toBeCalledWith(expectedLog);
      expect(consoleLogSpy).toBeCalledTimes(1);
      fs.unlinkSync(filePathInFolder);
    });
  });

  it('저장하고자 하는 경로가 존재하는 파일일 경우, 중복 이름 에러 테스트', async () => {
    fs.writeFileSync(filePathInFolder, 'text');
    const expectedError = '🚨 해당 경로에 동일한 이름의 파일이 존재해요';

    await pullCommand(author, fileName, { path: filePathInFolder });
    expect(consoleErrorSpy).toBeCalledWith(expectedError);
    expect(consoleErrorSpy).toBeCalledTimes(1);
    fs.unlinkSync(filePathInFolder);
  });

  it('저장하고자 하는 경로에서 파일을 제외한 경로가 존재할 경우, 파일 생성 성공 테스트', async () => {
    const expectedLog = '🌟 코드를 성공적으로 가져왔어요!';

    await pullCommand(author, fileName, { path: `${folderPath}/nonamed.txt` });
    expect(consoleLogSpy).toBeCalledWith(expectedLog);
    expect(consoleLogSpy).toBeCalledTimes(1);
    fs.unlinkSync(`${folderPath}/nonamed.txt`);
  });

  it('저장하고자 하는 경로에서 파일을 제외한 경로가 존재하지 않을 경우, 없는 경로 에러 테스트', async () => {
    const expectedError = '🚨 존재하지 않는 경로예요';

    await pullCommand(author, fileName, { path: './un/known/test.txt' });
    expect(consoleErrorSpy).toBeCalledWith(expectedError);
    expect(consoleErrorSpy).toBeCalledTimes(1);
  });
});

it('서버 에러일 경우, 에러 테스트', async () => {
  server.use(pullCodeHandler('SERVER'));
  const expectedError = '서버 에러 발생';

  await pullCommand(author, fileName, {});
  expect(consoleErrorSpy).toBeCalledWith(expectedError);
  expect(consoleErrorSpy).toBeCalledTimes(1);
});

it('네트워크 에러일 경우, 에러 테스트', async () => {
  server.use(pullCodeHandler('NETWORK'));
  const expectedError = '네트워크 에러 발생';

  await pullCommand(author, fileName, {});
  expect(consoleErrorSpy).toBeCalledWith(expectedError);
  expect(consoleErrorSpy).toBeCalledTimes(1);
});
