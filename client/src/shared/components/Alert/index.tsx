import { vars } from '@seed-design/design-token';
import { Icon } from '@shared/components';

import * as style from './style.css';

interface AlertInterface {
  status: 'error' | 'warning' | 'info' | 'success';
  children: React.ReactNode;
}

const AlertIcon = ({ status }: Pick<AlertInterface, 'status'>) => {
  const icon = {
    error: <Icon icon="warningFill" color={vars.$scale.color.red700} />,
    info: <Icon icon="information" color={vars.$scale.color.blue700} />,
    success: <Icon icon="check" color={vars.$scale.color.green600} />,
    warning: <Icon icon="warningFill" color={vars.$scale.color.carrot700} />,
  };
  return icon[status];
};

const AlertTitle = ({ children }: Pick<AlertInterface, 'children'>) => {
  return <p className={style.alertTitle}>{children}</p>;
};

const AlertDescription = ({ children }: Pick<AlertInterface, 'children'>) => {
  return <p className={style.alertDescription}>{children}</p>;
};

const AlertContainer = ({ status, children }: Pick<AlertInterface, 'status' | 'children'>) => {
  return (
    <div className={style.alertContainer({ status })}>
      <AlertIcon status={status} />
      <div className={style.alertTextContainer}>{children}</div>
    </div>
  );
};

/**
 * @description 어떤 알림 뷰를 보여주고 싶을 때 사용해요
 * @example 
 *  <Alert status={'error' | 'warning' | 'info' | 'success'}>
      <Alert.Title>타이틀이에요</Alert.Title>
      <Alert.Description>설명이에요</Alert.Description>
    </Alert>
 */
const Alert = Object.assign(AlertContainer, {
  Description: AlertDescription,
  Title: AlertTitle,
});

export default Alert;
