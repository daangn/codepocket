import { Icon } from '@shared/components';
import { useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import ModalProvider, { useModalAction, useModalValue } from './ModalContext';
import * as style from './style.css';

const ANIMATION_DURATION = 100;

interface ModalInterface {
  children?: React.ReactNode;
  isOpen: boolean;
  disableEscape?: boolean;
  closeModal: () => void;
}

interface ModalConfirmButtonProps {
  onConfirm?: () => void;
}

interface ModalCancelButtonProps {
  onCancel?: () => void;
}

const ModalPortal = ({ children }: Pick<ModalInterface, 'children'>) => {
  const modal = document.querySelector('#modal');
  if (!modal) throw new Error('#modal id div를 찾을 수 없어요');
  return ReactDOM.createPortal(children, modal);
};

const ModalConfirmButton = ({ onConfirm }: ModalConfirmButtonProps) => {
  const { closeModal } = useModalAction();

  const onClickHandler = () => {
    if (onConfirm) return onConfirm();
    return closeModal();
  };

  return (
    <button className={style.modalConfirmButton} onClick={onClickHandler}>
      수락하기
    </button>
  );
};

const ModalCancelButton = ({ onCancel }: ModalCancelButtonProps) => {
  const { closeModal } = useModalAction();

  const onClickHandler = () => {
    if (onCancel) return onCancel();
    return closeModal();
  };

  return (
    <button className={style.modalCancelButton} onClick={onClickHandler}>
      취소하기
    </button>
  );
};

const ModalCloseButton = () => {
  const { closeModal } = useModalAction();

  return (
    <div className={style.modalCloseButton} onClick={closeModal}>
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
  const { isOpen } = useModalValue();
  const { openModal, closeModal } = useModalAction();
  const closeTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (inputIsOpen) {
      openModal();
      return () => clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => closeModal(), ANIMATION_DURATION);
    return () => clearTimeout(closeTimerRef.current);
  }, [inputIsOpen, closeModal, openModal]);

  const onKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!disableEscape && event.key === 'Escape') {
        event.preventDefault();
        inputCloseModal();
      }
    },
    [inputCloseModal, disableEscape],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress);
    return () => document.removeEventListener('keydown', onKeyPress);
  }, [onKeyPress]);

  return (
    <ModalPortal>
      <div className={style.modalContainer({ isOpen })}>
        <div
          className={style.modalOverlay({ isAnimation: inputIsOpen })}
          onClick={inputCloseModal}
        />
        <section className={style.modalContent({ isAnimation: inputIsOpen })}>{children}</section>
      </div>
    </ModalPortal>
  );
};

const ModalContainer = ({ children, ...props }: ModalInterface) => {
  return (
    <ModalProvider>
      <ModalWrapper {...props}>{children}</ModalWrapper>
    </ModalProvider>
  );
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
