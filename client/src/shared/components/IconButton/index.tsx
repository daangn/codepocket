import { Icon } from '@shared/components';

import * as style from './style.css';

interface IconButtonInterface {
  icon: ReturnType<typeof Icon>;
  onClick?: () => void;
}

/**
 * @description 아이콘이 들어간 버튼을 만들고 싶을 때 사용해요
 * @example
 *  <IconButton icon={<Icon icon="iconName" />} />
 */
const IconButton = ({ icon, onClick }: IconButtonInterface) => {
  return (
    <button type="button" onClick={onClick} className={style.iconButton}>
      {icon}
    </button>
  );
};

export default IconButton;
