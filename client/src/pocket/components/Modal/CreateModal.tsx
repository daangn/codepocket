import type { ModalInterface } from '@shared/contexts/ModalContext';
import { localStorage } from '@shared/utils/localStorage';

import useCreateCode from '../../hooks/useCreateCode';
import ModalContentTemplate, { OnConfirmModal } from './Template';

const CreateModal = ({ closeModal }: ModalInterface) => {
  const { createCode } = useCreateCode();

  const onConfirm = ({ code, codeName, isAnonymous }: OnConfirmModal) => {
    if (!closeModal) return;
    createCode({
      code,
      codeName,
      isAnonymous,
      pocketToken: localStorage.getUserToken() || '',
    });
    closeModal();
  };

  return <ModalContentTemplate mode="create" closeModal={closeModal} onConfirm={onConfirm} />;
};

export default CreateModal;
