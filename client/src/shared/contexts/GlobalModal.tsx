import Modal from '@shared/components/Modal';
import { useModalDispatch, useModalState } from '@shared/contexts/ModalContext';
import { useCallback } from 'react';

import DeleteModal from '../../pocket/components/DeleteModal';
import EditModal from '../../pocket/components/EditModal';

export const modals = {
  deleteModal: DeleteModal,
  editModal: EditModal,
};

const GlobalModal = () => {
  const dispatch = useModalDispatch();
  const state = useModalState();

  const { ModalComponent, targetId } = state;
  const closeModal = useCallback(() => dispatch({ type: 'CLOSE_MODAL' }), [dispatch]);

  return (
    <Modal isOpen={state.isModalOpen} closeModal={closeModal} disableEscape>
      {ModalComponent && <ModalComponent targetId={targetId} closeModal={closeModal} />}
    </Modal>
  );
};

export default GlobalModal;
