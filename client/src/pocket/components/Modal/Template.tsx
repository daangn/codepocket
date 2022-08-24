import * as Sandpack from '@codesandbox/sandpack-react';
import { useActiveCode } from '@codesandbox/sandpack-react';
import { Modal } from '@shared/components';
import { rem } from 'polished';
import React, { useEffect, useMemo, useState } from 'react';

import * as style from './style.css';

export interface OnConfirmModal {
  codeName: string;
  isAnonymous: boolean;
  code: string;
}

interface ModalContentProps {
  mode: 'create' | 'edit';
  codeName?: string;
  useAnonymousMode?: boolean;
  closeModal?: () => void;
  onConfirm: (params: OnConfirmModal) => void;
}

interface ModalContentTemplateProps extends ModalContentProps {
  code?: string;
}

const ModalContent = (props: ModalContentProps) => {
  const { code } = useActiveCode();
  const [codeName, setCodeName] = useState('');
  const [useAnonymousMode, setUseAnonymousMode] = useState(false);

  const text = useMemo(() => (props.mode === 'create' ? '만들기' : '수정하기'), [props.mode]);

  useEffect(() => {
    setCodeName(props.codeName || '');
  }, [props.codeName]);

  useEffect(() => {
    setUseAnonymousMode(!!props.useAnonymousMode);
  }, [props.useAnonymousMode]);

  const onChangeAnonymousToggle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUseAnonymousMode(event.target.checked);
  const onChangeCodeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCodeName(event.target.value);

  const onConfirm = () => {
    props.onConfirm({ code, codeName, isAnonymous: useAnonymousMode });
  };

  return (
    <div className={style.modalContent}>
      <h1 className={style.modalHeaderText}>코드 {text}</h1>
      <div className={style.modalHeaderWrapper}>
        <div style={{ flexGrow: 8 }}>
          <label className={style.label} htmlFor="codename">
            코드이름
          </label>
          <input
            autoFocus
            id="codename"
            value={codeName}
            placeholder="코드이름을 지어주세요(ex. useCode)"
            className={style.modalTitleInput}
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
      <div className={style.modalButtonContainer}>
        <Modal.ConfirmButton text={text} onConfirm={onConfirm} />
        <Modal.CancelButton text="닫기" onCancel={props.closeModal} />
      </div>
    </div>
  );
};

const ModalContentTemplate = ({ code, ...props }: ModalContentTemplateProps) => (
  <div className={style.modalContainer}>
    <Sandpack.SandpackProvider
      template="react-ts"
      files={{ '/App.tsx': code || '' }}
      style={{ height: '100%' }}
    >
      <ModalContent {...props} />
    </Sandpack.SandpackProvider>
  </div>
);

export default ModalContentTemplate;
