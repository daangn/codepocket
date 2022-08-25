import { Modal } from '@shared/components';
import { ModalInterface } from '@shared/contexts/ModalContext';

import * as style from './style.css';

const StoryConfirmModal = ({ closeModal, onConfirm }: ModalInterface) => {
  const confirm = () => {
    if (onConfirm) onConfirm();
    if (closeModal) closeModal();
  };
  return (
    <div>
      <p className={style.modalParagraph}>정말로 스토리를 생성하시겠어요?</p>
      <div className={style.buttonWrapper}>
        <Modal.CancelButton onCancel={closeModal} />
        {onConfirm && <Modal.ConfirmButton onConfirm={confirm} />}
      </div>
    </div>
  );
};

export default StoryConfirmModal;
