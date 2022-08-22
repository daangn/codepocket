import * as Sandpack from '@codesandbox/sandpack-react';
import type { ModalInterface } from '@shared/contexts/ModalContext';

import useCode from '../../hooks/useCode';
import * as style from './style.css';
import ModalContentTemplate from './Template';

const CreateModal = ({ closeModal, targetId }: ModalInterface) => {
  const { data: codeInfo } = useCode({ codeId: targetId });

  return (
    <div className={style.modalContainer}>
      <Sandpack.SandpackProvider
        template="react-ts"
        files={{ '/App.tsx': codeInfo?.code || '' }}
        style={{ height: '100%' }}
      >
        <ModalContentTemplate
          closeModal={closeModal}
          codeName={codeInfo?.codeName}
          useAnonymousMode={codeInfo?.isAnonymous}
        />
      </Sandpack.SandpackProvider>
    </div>
  );
};

export default CreateModal;
