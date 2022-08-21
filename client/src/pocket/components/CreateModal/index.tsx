import { Modal } from '@shared/components';
import type { ModalInterface } from '@shared/contexts/ModalContext';

import * as style from './style.css';

const CreateModal = ({ closeModal, targetId }: ModalInterface) => {
  const editCode = () => {
    console.log(targetId);
  };

  return (
    <div className={style.editModalContainer}>
      <h1 className={style.editModalHeaderText}>수정할 내용을 입력해주세요</h1>
      <div className={style.editModalButtonContainer}>
        <Modal.ConfirmButton text="만들기" onConfirm={editCode} />
        <Modal.CancelButton text="닫기" onCancel={closeModal} />
      </div>
    </div>
  );
};

export default CreateModal;
