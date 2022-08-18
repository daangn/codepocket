import { Icon } from '@shared/components';

import * as style from './style.css';

interface IconButtonInterface {
  icon: ReturnType<typeof Icon>;
}

/**
 * @description 어떤 알림 뷰를 보여주고 싶을 때 사용해요
 * @example 
 *  <IconButton>
      <Alert.Title>타이틀이에요</Alert.Title>
      <Alert.Description>설명이에요</Alert.Description>
    </IconButton>
 */
const IconButton = ({ icon }: IconButtonInterface) => {
  return <button className={style.iconButton}>{icon}</button>;
};

export default IconButton;
