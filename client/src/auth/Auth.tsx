import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { pocketPath } from '../routes';
import useAuth from './hooks/useAuth';
import useTyping from './hooks/useTyping';
import * as style from './style.css';

interface UseLocation {
  state: { path?: string };
}

const AuthPage: React.FC = () => {
  const { state } = useLocation() as UseLocation;
  const [username, setUsername] = useState('');
  const { error, shake, verifyUserFromServer } = useAuth({ path: state?.path || pocketPath });
  const { text } = useTyping({
    content: '함께 공유해서 중복 노력이 없는 개발환경을 만들어요.',
    startDelay: 1000,
  });

  const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const verifyUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    verifyUserFromServer({ pocketToken: username });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.titleWrapper}>
        <h1 className={style.title}>Codepocket</h1>
        <h2 className={style.subtitle}>{text || ' '}</h2>
      </div>
      <form className={style.form} onSubmit={verifyUser}>
        <input
          name="username"
          className={style.input({
            shake,
          })}
          placeholder="토큰을 입력해주세요"
          value={username}
          onChange={changeUsername}
        />
        <button className={style.button}>인증하기</button>
        <span className={style.error}>{error}</span>
      </form>
    </div>
  );
};

export default AuthPage;
