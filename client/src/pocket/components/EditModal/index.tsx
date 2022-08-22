import * as Sandpack from '@codesandbox/sandpack-react';
import { useActiveCode } from '@codesandbox/sandpack-react';
import { Modal } from '@shared/components';
import type { ModalInterface } from '@shared/contexts/ModalContext';
import { localStorage } from '@shared/utils/localStorage';
import { rem } from 'polished';
import React, { useEffect, useState } from 'react';

import useCode from '../../hooks/useCode';
import useCreateCode from '../../hooks/useCreateCode';
import * as style from './style.css';

interface ModalContentProps {
  codeName?: string;
  useAnonymousMode?: boolean;
  closeModal?: () => void;
}

const ModalContent = (props: ModalContentProps) => {
  const { code } = useActiveCode();
  const [codeName, setCodeName] = useState('');
  const [useAnonymousMode, setUseAnonymousMode] = useState(false);
  const { createCode } = useCreateCode();

  useEffect(() => {
    setCodeName(props.codeName || '');
  }, [props.codeName]);

  useEffect(() => {
    setUseAnonymousMode(!!props.useAnonymousMode);
  }, [props.useAnonymousMode]);

  const onConfirm = () => {
    if (!props.closeModal) return;
    createCode({
      code,
      codeName,
      isAnonymous: useAnonymousMode,
      pocketToken: localStorage.getUserToken() || '',
    });
    props.closeModal();
  };

  const onChangeAnonymousToggle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUseAnonymousMode(event.target.checked);
  const onChangeCodeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCodeName(event.target.value);

  return (
    <div className={style.editModalContent}>
      <h1 className={style.editModalHeaderText}>새로운 코드 등록하기</h1>
      <div className={style.editModalHeaderWrapper}>
        <div style={{ flexGrow: 8 }}>
          <label className={style.label} htmlFor="codename">
            코드이름
          </label>
          <input
            autoFocus
            id="codename"
            value={codeName}
            placeholder="코드이름을 지어주세요(ex. useCode)"
            className={style.editModalTitleInput}
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
      <div className={style.editModalButtonContainer}>
        <Modal.ConfirmButton text="수정하기" onConfirm={onConfirm} />
        <Modal.CancelButton text="닫기" onCancel={props.closeModal} />
      </div>
    </div>
  );
};

const CreateModal = ({ closeModal, targetId }: ModalInterface) => {
  const { data: codeInfo } = useCode({ codeId: targetId });

  return (
    <div className={style.editModalContainer}>
      <Sandpack.SandpackProvider
        template="react-ts"
        files={{ '/App.tsx': codeInfo?.code || '' }}
        style={{ height: '100%' }}
      >
        <ModalContent
          closeModal={closeModal}
          codeName={codeInfo?.codeName}
          useAnonymousMode={codeInfo?.isAnonymous}
        />
      </Sandpack.SandpackProvider>
    </div>
  );
};

export default CreateModal;
