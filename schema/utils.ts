import fs from 'fs';
import prettier from 'prettier';

const TEMPLATE_TYPE_NAME = 'Self';
const TEMPLATE_VALIDATOR_NAME = 'self';

const typeRegex = new RegExp(TEMPLATE_TYPE_NAME, 'g');
const typeValidator = new RegExp(TEMPLATE_VALIDATOR_NAME, 'g');

export const removeFileExtension = (fileName: string) => fileName.split('.')[0];
export const capitalizeFront = (text: string) => text[0].toUpperCase() + text.slice(1);
export const replaceExtension = (fileName: string, extension: string) =>
  `${removeFileExtension(fileName)}.${extension}`;

export const removeBlank = (text: string) => text.replace(/\s/g, '');
export const addAsConst = (text: string) => `${text}as const`;
export const injectObject = (target: string) => (text: string) => text.replace(/\{\}/, target);
export const changeTypeName = (name: string) => (text: string) => text.replace(typeRegex, name);
export const changeValidatorName = (name: string) => (text: string) =>
  text.replace(typeValidator, name);
export const writeFile = (fileName: string) => (text: string) => fs.writeFileSync(fileName, text);

export const makeDir = (path: string) => fs.mkdirSync(path);
export const readDir = (path: string) => fs.readdirSync(path);
export const removeDir = (path: string) => fs.rmSync(path, { recursive: true, force: true });
export const readFile = (path: string) => fs.readFileSync(path).toString();

export const alignFormat = (text: string) => prettier.format(text, { parser: 'babel-ts' });

export const go = (...args: any[]) => args.reduce((acc, cur) => cur(acc));
export const reduce =
  <T, S>(f: (a: T, b: S) => T, ac: T) =>
  (i: any[]) =>
    i.reduce(f, ac);
