import { colors } from '@karrotmarket/design-token';
import Icon from '@shared/components/Icon';
import useClipboard from '@shared/hooks/useClipboard';
import { act, fireEvent, render, screen } from '@shared/utils/test-utils';
import { Link } from 'react-router-dom';

import { pocketPath } from '../routes';
import useQuery from './hooks/useSearch';
import * as style from './style.css';

function TokenPage() {
  const token = useQuery().get('token');
  const textToCopied = `export POCKET_TOKEN=${token}`;
  const { isCopied, copyToClipboard } = useClipboard({ text: textToCopied });

  return (
    <div className={style.wrapper}>
      <h1 aria-label="제목" className={style.title}>
        토큰이 발급되었어요!
      </h1>
      <p className={style.description}>아래 문구를 복사해 cli 환경변수로 등록해주세요!</p>
      <button
        type="button"
        aria-label="코드 복사 버튼"
        onClick={copyToClipboard}
        className={style.clipBoardContainer({ isCopied })}
      >
        <span className={style.clipBoardText}>{textToCopied}</span>
        <span className={style.clipBoardIconBox}>
          {isCopied ? (
            <Icon icon="check" color={colors.light.scheme.$blue800} />
          ) : (
            <Icon icon="clip" />
          )}
        </span>
      </button>
      <Link to={pocketPath}>
        <button aria-label="메인으로 이동하기" className={style.linkButton}>
          Codepocket으로 이동하기
        </button>
      </Link>
    </div>
  );
}

if (import.meta.vitest) {
  const { it, vi, expect } = import.meta.vitest;

  const writeTextMock = vi.fn();
  writeTextMock.mockImplementation((text) => Promise.resolve(text));
  Object.assign(navigator, {
    clipboard: { writeText: writeTextMock },
  });
  Object.defineProperty(window, 'location', {
    value: { pathname: '/shell' },
  });

  it('렌더링 테스트', () => {
    render(<TokenPage />);

    screen.getByLabelText(/제목/);
  });

  it('클립보드 테스트', async () => {
    render(<TokenPage />);

    act(() => {
      const copyButton = screen.getByLabelText(/코드 복사 버튼/);
      fireEvent.click(copyButton);
    });

    expect(writeTextMock).toBeCalledTimes(1);
  });

  it('메인으로 이동하기 버튼 클릭 테스트', () => {
    render(<TokenPage />);

    act(() => {
      const linkButton = screen.getByLabelText(/메인으로 이동하기/);
      fireEvent.click(linkButton);
    });
  });
}

export default TokenPage;
