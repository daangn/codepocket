import Modal from '@shared/components/Modal';
import { useModalDispatch, useModalState } from '@shared/contexts/ModalContext';
import { useCallback } from 'react';

import { CreateModal, DeleteModal, EditModal } from '../../pocket/components';

export const modals = {
  createModal: CreateModal,
  deleteModal: DeleteModal,
  editModal: EditModal,
};

const GlobalModal = () => {
  const dispatch = useModalDispatch();
  const state = useModalState();

  const { ModalComponent, targetId } = state;
  const closeModal = useCallback(() => {
    if (state.closeModal) state.closeModal();
    dispatch({ type: 'CLOSE_MODAL' });
  }, [dispatch, state]);

  return (
    <Modal isOpen={state.isModalOpen} closeModal={closeModal} disableEscape>
      {ModalComponent && <ModalComponent targetId={targetId} closeModal={closeModal} />}
    </Modal>
  );
};

export default GlobalModal;
