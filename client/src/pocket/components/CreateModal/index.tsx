import * as Sandpack from '@codesandbox/sandpack-react';
import { useActiveCode } from '@codesandbox/sandpack-react';
import { Modal } from '@shared/components';
import type { ModalInterface } from '@shared/contexts/ModalContext';
import { localStorage } from '@shared/utils/localStorage';
import { rem } from 'polished';
import React, { useState } from 'react';

import useCreateCode from '../../hooks/useCreateCode';
import * as style from './style.css';

interface ModalContentProps {
  closeModal?: () => void;
}

const ModalContent = ({ closeModal }: ModalContentProps) => {
  const { code } = useActiveCode();
  const [codeName, setCodeName] = useState('');
  const [useAnonymousMode, setUseAnonymousMode] = useState(true);
  const { createCode } = useCreateCode();

  const onConfirm = () => {
    if (!closeModal) return;
    createCode({
      code,
      codeName,
      isAnonymous: useAnonymousMode,
      pocketToken: localStorage.getUserToken() || '',
    });
    closeModal();
  };

  const onChangeAnonymousToggle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUseAnonymousMode(event.target.checked);
  const onChangeCodeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCodeName(event.target.value);

  return (
    <div className={style.createModalContent}>
      <h1 className={style.createModalHeaderText}>새로운 코드 등록하기</h1>
      <div className={style.createModalHeaderWrapper}>
        <div style={{ flexGrow: 8 }}>
          <label className={style.label} htmlFor="codename">
            코드이름
          </label>
          <input
            autoFocus
            id="codename"
            value={codeName}
            className={style.createModalTitleInput}
            onChange={onChangeCodeName}
          />
        </div>
        <div>
          <label className={style.label} htmlFor="title-input">
            익명
          </label>
          <label className={style.toggleSwitch}>
            <input
              id="title-input"
              type="checkbox"
              className={style.toggleSwitchInput}
              checked={useAnonymousMode}
              onChange={onChangeAnonymousToggle}
            />
            <span className={style.toggleSwitchSlider}></span>
          </label>
        </div>
      </div>
      <label className={style.label} htmlFor="code">
        코드
      </label>
      <Sandpack.SandpackLayout style={{ height: '100%' }}>
        <Sandpack.SandpackCodeEditor id="code" style={{ height: '100%', fontSize: rem(18) }} />
      </Sandpack.SandpackLayout>
      <div className={style.createModalButtonContainer}>
        <Modal.ConfirmButton text="만들기" onConfirm={onConfirm} />
        <Modal.CancelButton text="닫기" onCancel={closeModal} />
      </div>
    </div>
  );
};

const CreateModal = ({ closeModal }: ModalInterface) => {
  return (
    <div className={style.createModalContainer}>
      <Sandpack.SandpackProvider
        template="react-ts"
        files={{ '/App.tsx': '' }}
        style={{ height: '100%' }}
      >
        <ModalContent closeModal={closeModal} />
      </Sandpack.SandpackProvider>
    </div>
  );
};

export default CreateModal;
