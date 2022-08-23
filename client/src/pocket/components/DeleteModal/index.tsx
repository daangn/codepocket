import { Modal } from '@shared/components';
import { ModalInterface } from '@shared/contexts/ModalContext';
import { localStorage } from '@shared/utils/localStorage';
import { useCallback, useMemo } from 'react';

import useDeleteCode from '../../hooks/useDeleteCode';
import * as style from './style.css';

const DeleteModal = ({ closeModal, targetId }: ModalInterface) => {
  const { deleteCode: deleteCodeMutation } = useDeleteCode();

  const pocketToken = useMemo(() => localStorage.getUserToken() || '', []);
  const codeId = useMemo(() => targetId || '', [targetId]);

  const deleteCode = useCallback(() => {
    if (!closeModal) return;
    deleteCodeMutation({ codeId, pocketToken });
    closeModal();
  }, [closeModal, codeId, deleteCodeMutation, pocketToken]);

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
