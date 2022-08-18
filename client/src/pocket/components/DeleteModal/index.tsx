import { Modal } from '@shared/components';

import { useModalDispatch, useModalState } from '../../contexts/ModalContext';
import * as style from './style.css';

const DeleteModal = () => {
  const dispatch = useModalDispatch();
  const { isDeleteModalOpen } = useModalState();

  return (
    <Modal
      disableEscape
      isOpen={isDeleteModalOpen}
      closeModal={() => dispatch({ type: 'TOGGLE_DELETE_MODAL' })}
    >
      <div className={style.deleteModalContainer}>
        <h1 className={style.deleteModalHeaderText}>정말로 삭제하시겠어요?</h1>
        <div className={style.deleteModalButtonContainer}>
          <Modal.ConfirmButton
            text="삭제하기"
            variant="warn"
            onConfirm={() => dispatch({ type: 'TOGGLE_DELETE_MODAL' })}
          />
          <Modal.CancelButton onCancel={() => dispatch({ type: 'TOGGLE_DELETE_MODAL' })} />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
