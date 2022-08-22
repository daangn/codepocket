import * as Sandpack from '@codesandbox/sandpack-react';
import type { ModalInterface } from '@shared/contexts/ModalContext';

import * as style from './style.css';
import ModalContentTemplate from './Template';

const CreateModal = ({ closeModal }: ModalInterface) => {
  return (
    <div className={style.modalContainer}>
      <Sandpack.SandpackProvider
        template="react-ts"
        files={{ '/App.tsx': '' }}
        style={{ height: '100%' }}
      >
        <ModalContentTemplate mode="create" closeModal={closeModal} />
      </Sandpack.SandpackProvider>
    </div>
  );
};

export default CreateModal;
