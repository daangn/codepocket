// @ts-nocheck TODO: 스토리 로컬스토리지 기능 개선 후 제거하기
import * as Sandpack from '@codesandbox/sandpack-react';
import * as theme from '@codesandbox/sandpack-themes';
import { Modal } from '@shared/components';
import { rem } from 'polished';
import { useState } from 'react';

import useCode from '../../hooks/useCode';
import {
  createObjWithCertainValue,
  filterObjValueWithKey,
  filterObjWithKey,
} from '../../utils/filterObj';
import getAllCodesFromSandpack from '../../utils/getAllCodesFromSandpack';
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
  code: string;
  selectedStoryCodes?: SelectedStory;
  pushCode: ({
    codes,
    storyName,
  }: {
    codes: { [key in string]: string };
    storyName: string;
  }) => void;
}

const SandpackComponent: React.FC<SandpackComponentProps> = (props) => {
  const {
    sandpack: { files },
  } = Sandpack.useSandpack();
  const [storyName, setStoryName] = useState('');
  const [isModalOpened, setIsModalOpened] = useState(false);

  const changeStoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStoryName(event.target.value);
  };

  const createNewStory = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!storyName) return;

    setIsModalOpened(true);
  };

  const closeModal = () => setIsModalOpened(false);
  const onCancel = () => closeModal();
  const onConfirm = () => {
    const codes = getAllCodesFromSandpack({ files, codeName: props.codeName });
    props.pushCode({ codes, storyName });
    setStoryName('');
    closeModal();
  };

  return (
    <>
      <Modal isOpen={isModalOpened} closeModal={closeModal}>
        <p className={style.modalParagraph}>정말로 스토리를 생성하시겠어요?</p>
        <div className={style.buttonWrapper}>
          <Modal.CancelButton onCancel={onCancel} />
          <Modal.ConfirmButton onConfirm={onConfirm} />
        </div>
      </Modal>
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
  return (
    <SandpackComponent
      codeName={props.codeName}
      pushCode={props.pushCode}
      isStory={!!props.selectedStoryCodes}
    />
  );
};

export default SandpackWrapper;
