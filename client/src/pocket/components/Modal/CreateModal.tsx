import type { ModalInterface } from '@shared/contexts/ModalContext';

import ModalContentTemplate from './Template';

const CreateModal = ({ closeModal }: ModalInterface) => {
  return <ModalContentTemplate mode="create" closeModal={closeModal} />;
};

export default CreateModal;
