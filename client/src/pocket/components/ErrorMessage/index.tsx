import { Icon } from '@shared/components';

import * as style from './style.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className={style.alertBase}>
      <Icon icon="warningFill" color="red" />
      {message}
    </div>
  );
};

export default ErrorMessage;
