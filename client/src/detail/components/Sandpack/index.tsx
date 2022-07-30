import * as Sandpack from '@codesandbox/sandpack-react';
import * as theme from '@codesandbox/sandpack-themes';
import { rem } from 'polished';
import { useState } from 'react';

import useCode from '../../hooks/useCode';
import {
  createObjWithCertainValue,
  filterObjValueWithKey,
  filterObjWithKey,
} from '../../utils/filterObj';
import { getDependenciesFromText } from '../../utils/parse';
import { genrateBaseCode } from '../../utils/textGenerator';
import * as style from './style.css';

export interface SelectedStory {
  codes: { [fileName: string]: string };
}

interface SandpackComponentProps {
  isStory: boolean;
  codeName: string;
  pushCode: ({
    codes,
    storyName,
  }: {
    codes: { [key in string]: string };
    storyName: string;
  }) => void;
}

interface SandpackWrapperProps {
  codeName: string;
  codeAuthor: string;
  selectedStory?: SelectedStory;
  pushCode: ({
    codes,
    storyName,
  }: {
    codes: { [key in string]: string };
    storyName: string;
  }) => void;
}

const ROOT_FILE = '/App.tsx';
const SandpackComponent: React.FC<SandpackComponentProps> = (props) => {
  const {
    sandpack: { files },
  } = Sandpack.useSandpack();
  const [storyName, setStoryName] = useState('');

  const getAllCodes = () => {
    const SANDPACK_FILE_CODE = 'code';
    const storyNames = [ROOT_FILE, `/${props.codeName}`];
    const codes = filterObjValueWithKey(filterObjWithKey(files, storyNames), SANDPACK_FILE_CODE);
    return codes;
  };

  const changeStoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStoryName(event.target.value);
  };

  const createNewStory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!storyName) return;

    const codes = getAllCodes();
    props.pushCode({ codes, storyName });
    setStoryName('');
  };

  return (
    <>
      <div className={style.sandpackWrapper}>
        <Sandpack.SandpackLayout style={{ height: '100%' }}>
          <Sandpack.SandpackCodeEditor closableTabs style={{ height: '100%', fontSize: rem(18) }} />
          <Sandpack.SandpackPreview style={{ height: '100%' }} />
        </Sandpack.SandpackLayout>
      </div>
      <form className={style.storyCreatingForm} onSubmit={createNewStory}>
        <input
          className={style.storyNameInput({ enable: !props.isStory })}
          placeholder="스토리 이름"
          value={storyName}
          onChange={changeStoryName}
          disabled={props.isStory}
        />
        <button disabled={props.isStory} className={style.submitButton({ enable: !props.isStory })}>
          스토리 생성하기
        </button>
      </form>
    </>
  );
};

const SandpackWrapper: React.FC<SandpackWrapperProps> = (props) => {
  const { data: codeDataRes } = useCode({ codeAuthor: props.codeAuthor, codeName: props.codeName });

  const VERSION = 'latest';
  const dependencies = createObjWithCertainValue(
    getDependenciesFromText(codeDataRes?.code || ''),
    VERSION,
  );
  const files = {
    [ROOT_FILE]: genrateBaseCode(props.codeName),
    [`/${props.codeName}`]: codeDataRes?.code || '',
    ...props.selectedStory?.codes,
  };

  return (
    <Sandpack.SandpackProvider
      theme={theme.aquaBlue}
      template="react-ts"
      customSetup={{ dependencies }}
      files={files}
    >
      <SandpackComponent
        codeName={props.codeName}
        pushCode={props.pushCode}
        isStory={!!props.selectedStory}
      />
    </Sandpack.SandpackProvider>
  );
};

export default SandpackWrapper;
