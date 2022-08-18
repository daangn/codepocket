import { Modal } from '@shared/components';
import { useCallback } from 'react';

import { useModalDispatch, useModalState } from '../../contexts/ModalContext';
import * as style from './style.css';

const EditModal = () => {
  const dispatch = useModalDispatch();
  const { isEditModalOpen } = useModalState();

  const toggleModal = useCallback(() => dispatch({ type: 'TOGGLE_EDIT_MODAL' }), [dispatch]);

  return (
    <Modal disableEscape isOpen={isEditModalOpen} closeModal={toggleModal}>
      <div className={style.editModalContainer}>
        <h1 className={style.editModalHeaderText}>수정할 내용을 입력해주세요</h1>
        <div className={style.editModalButtonContainer}>
          <Modal.ConfirmButton text="수정하기" onConfirm={toggleModal} />
          <Modal.CancelButton onCancel={toggleModal} />
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
