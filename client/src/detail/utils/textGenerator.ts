import { convertFirstToUpperCase, getExtension, removeExtension } from './parse';

export const genrateBaseCode = (name: string) => {
  const reactExtension = ['jsx', 'tsx'];
  const isComponent = reactExtension.includes(getExtension(name));
  const importedName = isComponent
    ? convertFirstToUpperCase(removeExtension(name))
    : removeExtension(name);
  const renderedJSX = isComponent
    ? `<${importedName} />`
    : `<h1>콘솔창을 보려면 F12를 누르세요</h1>`;

  return `import ${importedName} from './${removeExtension(name)}'

export default function App(): JSX.Element {
  return ${renderedJSX}
}
`;
};
