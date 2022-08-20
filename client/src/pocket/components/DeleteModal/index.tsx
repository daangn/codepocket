import { Modal } from '@shared/components';
import type { ModalInterface } from '@shared/contexts/ModalContext';

import * as style from './style.css';

const DeleteModal = ({ closeModal, targetId }: ModalInterface) => {
  const deleteCode = () => {
    console.log(targetId);
  };

  return (
    <div className={style.deleteModalContainer}>
      <h1 className={style.deleteModalHeaderText}>정말로 삭제하시겠어요?</h1>
      <div className={style.deleteModalButtonContainer}>
        <Modal.ConfirmButton text="삭제하기" variant="warn" onConfirm={deleteCode} />
        <Modal.CancelButton onCancel={closeModal} />
      </div>
    </div>
  );
};

export default DeleteModal;
