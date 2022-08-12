import { Icon } from '@shared/components';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import * as style from './style.css';

const ANIMATION_DURATION = 100;

interface ModalInterface {
  children?: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
}

const ModalContainer = ({ children }: Pick<ModalInterface, 'children'>) => {
  const modal = document.querySelector('#modal');
  if (!modal) throw new Error('#modal id div를 찾을 수 없어요');
  return ReactDOM.createPortal(children, modal);
};

/**
 * @description 모달을 띄우고 싶을 때 사용해요
 * @example 
 *  <Alert status={'error' | 'warning' | 'info' | 'success'}>
      <Alert.Title>타이틀이에요</Alert.Title>
      <Alert.Description>설명이에요</Alert.Description>
    </Alert>
 */
const Modal = ({ children, isOpen: inputIsOpen, closeModal }: ModalInterface) => {
  const [isOpen, setIsOpen] = useState(inputIsOpen);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (inputIsOpen) {
      setIsOpen(true);
    } else {
      timer = setTimeout(() => setIsOpen(false), ANIMATION_DURATION);
    }

    return () => clearTimeout(timer);
  }, [inputIsOpen]);

  return (
    <ModalContainer>
      <div className={style.modalContainer({ isOpen })}>
        <div className={style.modalOverlay({ isAnimation: inputIsOpen })} onClick={closeModal} />
        <section className={style.modalContent({ isAnimation: inputIsOpen })}>
          <div className={style.modalCloseButton} onClick={closeModal}>
            <Icon icon="close" />
          </div>
          {children}
        </section>
      </div>
    </ModalContainer>
  );
};

export default Modal;
