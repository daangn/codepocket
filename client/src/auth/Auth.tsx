import React from 'react';
import { useLocation } from 'react-router-dom';

import { pocketPath } from '../routes';
import { LoginButton, SubTitle } from './components';
import useAuth from './hooks/useAuth';
import * as style from './style.css';

interface UseLocation {
  state: { path?: string };
}

const AuthPage: React.FC = () => {
  const { state: location } = useLocation() as UseLocation;
  const { error, verifyUserFromServer } = useAuth({ path: location?.path || pocketPath });

  const verifyUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    verifyUserFromServer({ pocketToken: '' });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.titleWrapper}>
        <h1 className={style.title}>Codepocket</h1>
        <SubTitle content="함께 공유해서 중복 노력이 없는 개발환경을 만들어요." startDelay={1000} />
      </div>
      <form className={style.form} onSubmit={verifyUser}>
        <button className={style.button}>인증하기</button>
        <span className={style.error}>{error}</span>
      </form>
      <LoginButton />
    </div>
  );
};

export default AuthPage;
