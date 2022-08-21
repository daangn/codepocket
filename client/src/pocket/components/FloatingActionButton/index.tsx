import Transition from '@shared/utils/Transition';
import { useState } from 'react';

import useScrollDirection from '../../hooks/useScrollDirection';
import * as style from './style.css';

interface FloatingButtonProps {}

const FloatingActionButton: React.FC<FloatingButtonProps> = () => {
  const [selected, setSelected] = useState(false);
  const { scrollDir } = useScrollDirection();

  const toggleButton = () => setSelected((prev) => !prev);

  return (
    <Transition isOn={scrollDir === 'up'} timeout={300}>
      {() => (
        <div className={style.wrapper({ useOnMode: scrollDir === 'up' })}>
          <button className={style.floatingButton({ selected })} onClick={toggleButton}>
            +
          </button>
        </div>
      )}
    </Transition>
  );
};

export default FloatingActionButton;
