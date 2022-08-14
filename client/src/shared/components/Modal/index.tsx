import { Icon } from '@shared/components';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import * as style from './style.css';

const ANIMATION_DURATION = 100;

interface ModalInterface {
  children?: React.ReactNode;
  isOpen: boolean;
  disableEscape?: boolean;
  closeModal: () => void;
}

const ModalPortal = ({ children }: Pick<ModalInterface, 'children'>) => {
  const modal = document.querySelector('#modal');
  if (!modal) throw new Error('#modal id div를 찾을 수 없어요');
  return ReactDOM.createPortal(children, modal);
};

/**
 * @description 모달을 띄우고 싶을 때 사용해요
 * @example 
 *  <Modal isOpen={boolean} disableEscape={boolean} closeModal={handleCloseModal}>
      {children}
    </Modal>
 */
const ModalContainer = ({
  children,
  isOpen: inputIsOpen,
  disableEscape,
  closeModal,
}: ModalInterface) => {
  const [isOpen, setIsOpen] = useState(inputIsOpen);
  const closeTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (inputIsOpen) {
      setIsOpen(true);
      return () => clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => setIsOpen(false), ANIMATION_DURATION);
    return () => clearTimeout(closeTimerRef.current);
  }, [inputIsOpen]);

  const onKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (!disableEscape && event.key === 'Escape') {
        event.preventDefault();
        closeModal();
      }
    },
    [closeModal, disableEscape],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress);
    return () => document.removeEventListener('keydown', onKeyPress);
  }, [onKeyPress]);

  return (
    <ModalPortal>
      <div className={style.modalContainer({ isOpen })}>
        <div className={style.modalOverlay({ isAnimation: inputIsOpen })} onClick={closeModal} />
        <section className={style.modalContent({ isAnimation: inputIsOpen })}>
          <div className={style.modalCloseButton} onClick={closeModal}>
            <Icon icon="close" />
          </div>
          {children}
        </section>
      </div>
    </ModalPortal>
  );
};

const Modal = Object.assign(ModalContainer, {});

export default Modal;
