import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { pocketPath } from '../routes';
import { SubTitle } from './components';
import useCustomAuth0 from './hooks/useCustomAuth0';
import useVerifyUserMutation from './hooks/useVerifyUserMutation';
import * as style from './style.css';

interface UseLocation {
  state: { path?: string };
}

const AuthPage: React.FC = () => {
  const { state: location } = useLocation() as UseLocation;
  const navigate = useNavigate();
  const { verifyUser } = useVerifyUserMutation({ path: location?.path || pocketPath });
  const { isAuthenticated, user, logout, loginWithPopup, isValidEmailDomain } = useCustomAuth0({
    domain: 'daangn.com',
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
      navigate('/token', { state: { userName: user?.nickname, email: user?.email } });
    }
  }, [isValidEmailDomain, isAuthenticated, logout, navigate, user?.email, user?.nickname]);

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
