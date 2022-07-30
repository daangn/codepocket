import {
  addAsConst,
  alignFormat,
  capitalizeFront,
  changeTypeName,
  go,
  injectObject,
  makeDir,
  readDir,
  readFile,
  reduce,
  removeBlank,
  removeDir,
  removeFileExtension,
  replaceExtension,
  writeFile,
} from './utils';

const SCHEMA_DIR = './json';
const TYPE_DIR = './types';

const generateType = (fileName: string) => {
  const template = readFile('./template.ts');
  const json = readFile(`${SCHEMA_DIR}/${fileName}`);
  const typeFileName = `${TYPE_DIR}/${capitalizeFront(replaceExtension(fileName, 'ts'))}`;

  go(
    template,
    injectObject(go(json, removeBlank, addAsConst)),
    changeTypeName(go(fileName, removeFileExtension, capitalizeFront)),
    alignFormat,
    writeFile(typeFileName),
  );
};

const generateIndexText = (acc: string, fileName: string) => {
  generateType(fileName);
  return `${acc}export * from '${TYPE_DIR}/${removeFileExtension(fileName)}';\n`;
};

(() => {
  removeDir(TYPE_DIR);
  makeDir(TYPE_DIR);

  go(readDir(SCHEMA_DIR), reduce(generateIndexText, ''), alignFormat, writeFile('./index.ts'));
})();
