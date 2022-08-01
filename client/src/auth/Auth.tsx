import { act, fireEvent, render, screen } from '@shared/utils/test-utils';
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
          aria-label="token-input"
          name="token"
          className={style.input({
            shake,
          })}
          placeholder="토큰을 입력해주세요"
          value={username}
          onChange={changeUsername}
        />
        <button aria-label="submit-button" className={style.button}>
          인증하기
        </button>
        <span className={style.error}>{error}</span>
      </form>
    </div>
  );
};

if (import.meta.vitest) {
  const { it } = import.meta.vitest;

  Object.defineProperty(window, 'location', {
    value: { pathname: '/shell' },
  });

  it('렌더링 테스트', () => {
    render(<AuthPage />);
    screen.getByText(/Codepocket/);
  });

  it('api 테스트', () => {
    render(<AuthPage />);
    act(() => {
      const input = screen.getByLabelText(/token-input/);
      fireEvent.change(input, { target: { value: 'shell' } });

      const button = screen.getByLabelText(/submit-button/);
      fireEvent.click(button);
    });
    // TODO: add check path
  });
}

export default AuthPage;
