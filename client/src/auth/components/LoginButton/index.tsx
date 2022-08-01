import { useAuth0 } from '@auth0/auth0-react';

import * as style from './style.css';

interface LoginButtonInterface {
  isShaking: boolean;
}

const LoginButton: React.FC<LoginButtonInterface> = ({ isShaking }) => {
  const { loginWithPopup } = useAuth0();

  return (
    <button
      className={style.button({
        isShaking,
      })}
      onClick={() => loginWithPopup()}
    >
      로그인 하기
    </button>
  );
};

export default LoginButton;
