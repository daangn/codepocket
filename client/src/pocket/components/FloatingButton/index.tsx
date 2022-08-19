import { useState } from 'react';

import * as style from './styled.css';

interface FloatingButtonProps {}

const FloatingButton: React.FC<FloatingButtonProps> = () => {
  const [selected, setSelected] = useState(false);

  const toggleButton = () => setSelected((prev) => !prev);

  return (
    <div className={style.wrapper}>
      <button className={style.floatingButton({ selected })} onClick={toggleButton}>
        +
      </button>
    </div>
  );
};

export default FloatingButton;
