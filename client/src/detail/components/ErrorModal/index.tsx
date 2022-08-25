import { Icon, Modal } from '@shared/components';
import { ModalInterface } from '@shared/contexts/ModalContext';

import * as style from './style.css';

const ErrorModal = ({ closeModal }: ModalInterface) => {
  return (
    <div className={style.modalContent}>
      <Icon icon="warningFill" color="red" />
      <div>올바르지 않은 요청이 발생했어요(한번 더 확인해주세요)</div>
      <Modal.CancelButton text="닫기" onCancel={closeModal} />
    </div>
  );
};

export default ErrorModal;
