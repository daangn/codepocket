import { Modal } from '@shared/components';
import type { ModalInterface } from '@shared/contexts/ModalContext';

import * as style from './style.css';

const EditModal = ({ closeModal, targetId }: ModalInterface) => {
  const editCode = () => {
    console.log(targetId);
  };

  return (
    <div className={style.editModalContainer}>
      <h1 className={style.editModalHeaderText}>수정할 내용을 입력해주세요</h1>
      <div className={style.editModalButtonContainer}>
        <Modal.ConfirmButton text="수정하기" onConfirm={editCode} />
        <Modal.CancelButton onCancel={closeModal} />
      </div>
    </div>
  );
};

export default EditModal;
