import to from 'await-to-js';
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { pocketPath } from '../routes';
import * as style from './style.css';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

function TokenPage() {
  const token = useQuery().get('token');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const textToCopied = `export POCKET_TOKEN=${token}`;

  const copyToClipboard = async () => {
    const [error] = await to(navigator.clipboard.writeText(textToCopied));
    if (error) setIsCopied(false);
    else {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>토큰이 발급되었어요!</h1>
      <p className={style.description}>아래 문구를 복사해 cli 환경변수로 등록해주세요!</p>
      <span className={style.clipBoard}>export POCKET_TOKEN={token}</span>
      <button
        type="button"
        aria-label="코드 복사 버튼"
        className={style.codeItemHeaderCopyButton}
        onClick={copyToClipboard}
      >
        {isCopied ? 'COPIED!' : 'COPY'}
      </button>
      <Link to={pocketPath}>
        <button aria-label="메인으로 이동하기" className={style.linkButton}>
          Codepocket으로 이동하기
        </button>
      </Link>
    </div>
  );
}

export default TokenPage;
