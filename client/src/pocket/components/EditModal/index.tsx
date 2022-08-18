import { Modal } from '@shared/components';

import { useModalDispatch, useModalState } from '../../contexts/ModalContext';
import * as style from './style.css';

const EditModal = () => {
  const dispatch = useModalDispatch();
  const { isEditModalOpen } = useModalState();

  return (
    <Modal
      disableEscape
      isOpen={isEditModalOpen}
      closeModal={() => dispatch({ type: 'TOGGLE_EDIT_MODAL' })}
    >
      <div className={style.editModalContainer}>
        <h1 className={style.editModalHeaderText}>수정할 내용을 입력해주세요</h1>
        <div className={style.editModalButtonContainer}>
          <Modal.ConfirmButton
            text="수정하기"
            onConfirm={() => dispatch({ type: 'TOGGLE_EDIT_MODAL' })}
          />
          <Modal.CancelButton onCancel={() => dispatch({ type: 'TOGGLE_EDIT_MODAL' })} />
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
