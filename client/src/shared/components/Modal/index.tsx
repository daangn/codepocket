import { Icon } from '@shared/components';
import useKeyboard from '@shared/hooks/useKeyboard';
import Transition from '@shared/utils/Transition';
import ReactDOM from 'react-dom';

import * as style from './style.css';

const ANIMATION_DURATION = 150;

interface ModalInterface {
  children?: React.ReactNode;
  isOpen?: boolean;
  disableEscape?: boolean;
  closeModal: () => void;
}

interface ModalConfirmButtonProps {
  onConfirm: () => void;
  variant?: 'warn' | 'normal';
  text?: string;
}

interface ModalCancelButtonProps {
  onCancel: (() => void) | undefined;
  text?: string;
}

interface ModalCloseButtonProps {
  onClose: () => void;
}

const ModalPortal = ({ children }: Pick<ModalInterface, 'children'>) => {
  const modal = document.querySelector('#modal');
  if (!modal) throw new Error('#modal id div를 찾을 수 없어요');
  return ReactDOM.createPortal(children, modal);
};

const ModalConfirmButton = ({
  onConfirm,
  variant = 'normal',
  text = '수락하기',
}: ModalConfirmButtonProps) => {
  return (
    <button className={style.modalConfirmButton({ variant })} onClick={onConfirm}>
      {text}
    </button>
  );
};

const ModalCancelButton = ({ onCancel = () => {}, text = '취소하기' }: ModalCancelButtonProps) => {
  return (
    <button className={style.modalCancelButton} onClick={onCancel}>
      {text}
    </button>
  );
};

const ModalCloseButton = ({ onClose }: ModalCloseButtonProps) => {
  return (
    <div className={style.modalCloseButton} onClick={onClose}>
      <Icon icon="close" />
    </div>
  );
};

const ModalWrapper = ({
  children,
  disableEscape,
  isOpen: inputIsOpen,
  closeModal: inputCloseModal,
}: ModalInterface) => {
  useKeyboard({
    keyEvents: [
      {
        key: 'Escape',
        keyEvent: () => {
          if (!disableEscape) inputCloseModal();
        },
      },
    ],
  });

  return (
    <ModalPortal>
      <Transition isOn={inputIsOpen} timeout={ANIMATION_DURATION}>
        {(status) => (
          <div className={style.modalContainer({ isOpen: status !== 'off' })}>
            <div
              className={style.modalOverlay({ isAnimation: inputIsOpen })}
              onClick={inputCloseModal}
            />
            <section className={style.modalContent({ isAnimation: inputIsOpen })}>
              {children}
            </section>
          </div>
        )}
      </Transition>
    </ModalPortal>
  );
};

const ModalContainer = ({ children, ...props }: ModalInterface) => {
  return <ModalWrapper {...props}>{children}</ModalWrapper>;
};

/**
 * @description 모달을 띄우고 싶을 때 사용해요
 * @example 
 *  <Modal isOpen={boolean} disableEscape={boolean} closeModal={handleCloseModal}>
      {children}
      <Modal.ConfirmButton onConfirm={onConfirm} />
      <Modal.CancelButton onCancel={onCancel} />
    </Modal>
 */
const Modal = Object.assign(ModalContainer, {
  CloseButton: ModalCloseButton,
  CancelButton: ModalCancelButton,
  ConfirmButton: ModalConfirmButton,
});

export default Modal;
