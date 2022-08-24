import type { ModalInterface } from '@shared/contexts/ModalContext';
import useCode from '@shared/hooks/useCode';
import { localStorage } from '@shared/utils/localStorage';

import useUpdateCode from '../../hooks/useUpdateCode';
import ModalContentTemplate, { OnConfirmModal } from './Template';

const CreateModal = ({ closeModal, targetId }: ModalInterface) => {
  const { data: codeInfo } = useCode({ codeId: targetId });
  const { updateCode } = useUpdateCode();

  const onConfirm = ({ code, codeName, isAnonymous }: OnConfirmModal) => {
    if (!closeModal) return;
    updateCode({
      code,
      codeName,
      isAnonymous,
      codeId: targetId || '',
      pocketToken: localStorage.getUserToken() || '',
    });
    closeModal();
  };

  return (
    <ModalContentTemplate
      mode="edit"
      code={codeInfo?.code}
      onConfirm={onConfirm}
      closeModal={closeModal}
      codeName={codeInfo?.codeName}
      useAnonymousMode={codeInfo?.isAnonymous}
    />
  );
};

export default CreateModal;
