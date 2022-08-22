import { useModalDispatch } from '@shared/contexts/ModalContext';
import Transition from '@shared/utils/Transition';
import { useState } from 'react';

import useScrollDirection from '../../hooks/useScrollDirection';
import CreateModal from '../CreateModal';
import * as style from './style.css';

interface FloatingButtonProps {}

const FloatingActionButton: React.FC<FloatingButtonProps> = () => {
  const [selected, setSelected] = useState(false);
  const modalDispatch = useModalDispatch();
  const { scrollDir } = useScrollDirection();

  const toggleButton = () => setSelected((prev) => !prev);

  const onClickButton = () => {
    toggleButton();
    if (!selected)
      modalDispatch({ type: 'OPEN_MODAL', Component: CreateModal, closeModal: toggleButton });
  };

  return (
    <Transition isOn={scrollDir === 'up'} timeout={300}>
      {() => (
        <div className={style.wrapper({ useOnMode: scrollDir === 'up' })}>
          <button className={style.floatingButton({ selected })} onClick={onClickButton}>
            +
          </button>
        </div>
      )}
    </Transition>
  );
};

export default FloatingActionButton;
