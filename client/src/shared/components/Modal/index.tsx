import { Icon } from '@shared/components';
import { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';

import * as style from './style.css';
import Transition from './Transition';

const ANIMATION_DURATION = 100;

interface ModalInterface {
  children?: React.ReactNode;
  isOpen: boolean;
  disableEscape?: boolean;
  closeModal: () => void;
}

interface ModalConfirmButtonProps {
  onConfirm: () => void;
}

interface ModalCancelButtonProps {
  onCancel: () => void;
}

interface ModalCloseButtonProps {
  onClose: () => void;
}

const ModalPortal = ({ children }: Pick<ModalInterface, 'children'>) => {
  const modal = document.querySelector('#modal');
  if (!modal) throw new Error('#modal id div를 찾을 수 없어요');
  return ReactDOM.createPortal(children, modal);
};

const ModalConfirmButton = ({ onConfirm }: ModalConfirmButtonProps) => {
  const onClickHandler = () => {
    onConfirm();
  };

  return (
    <button className={style.modalConfirmButton} onClick={onClickHandler}>
      수락하기
    </button>
  );
};

const ModalCancelButton = ({ onCancel }: ModalCancelButtonProps) => {
  const onClickHandler = () => {
    onCancel();
  };

  return (
    <button className={style.modalCancelButton} onClick={onClickHandler}>
      취소하기
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
      <Transition isOn={inputIsOpen} timeout={ANIMATION_DURATION}>
        {(status) => (
          <div className={style.modalContainer({ isOpen: status === 'on' })}>
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
