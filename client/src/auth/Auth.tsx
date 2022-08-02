import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { pocketPath } from '../routes';
import { SubTitle } from './components';
import useCreateUser from './hooks/useCreateUser';
import useCustomAuth0 from './hooks/useCustomAuth0';
import useVerifyUser from './hooks/useVerifyUser';
import * as style from './style.css';

interface UseLocation {
  state: { path?: string };
}

const AuthPage: React.FC = () => {
  const { state: location } = useLocation() as UseLocation;
  const navigate = useNavigate();
  const { verifyUser } = useVerifyUser({ path: location?.path || pocketPath });
  const { isAuthenticated, user, logout, loginWithPopup, isValidEmailDomain } = useCustomAuth0({
    domain: 'daangn.com',
  });
  const { createUser } = useCreateUser({
    userName: user?.nickname,
    email: user?.email,
  });

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  useEffect(() => {
    if (!isAuthenticated) return;

    if (!isValidEmailDomain()) {
      alert('당근 유저가 아니에요!');
      logout();
    } else {
      createUser();
    }
  }, [isValidEmailDomain, isAuthenticated, logout, navigate, createUser]);

  return (
    <div className={style.wrapper}>
      <div className={style.titleWrapper}>
        <h1 className={style.title}>Codepocket</h1>
        <SubTitle content="함께 공유해서 중복 노력이 없는 개발환경을 만들어요." startDelay={1000} />
      </div>
      <div className={style.buttonWrapper}>
        <button className={style.button} onClick={() => loginWithPopup()}>
          로그인 하기
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
