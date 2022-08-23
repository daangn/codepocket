import type { ModalInterface } from '@shared/contexts/ModalContext';

import useCode from '../../hooks/useCode';
import ModalContentTemplate from './Template';

const CreateModal = ({ closeModal, targetId }: ModalInterface) => {
  const { data: codeInfo } = useCode({ codeId: targetId });

  return (
    <ModalContentTemplate
      mode="edit"
      code={codeInfo?.code}
      closeModal={closeModal}
      codeName={codeInfo?.codeName}
      useAnonymousMode={codeInfo?.isAnonymous}
    />
  );
};

export default CreateModal;
