import { vars } from '@seed-design/design-token';
import { Alert, Icon } from '@shared/components';
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
        토큰이 발급되었어요.
      </h1>
      <Alert status="error">
        <Alert.Description>
          cli에 사용되는 토큰이에요. 아래 토큰을 터미널에 등록해야해요{`\n`}
          해당 토큰은 이 페이지를 나가면 알 수 없어요.
        </Alert.Description>
      </Alert>
      <button
        type="button"
        aria-label="코드 복사 버튼"
        onClick={copyToClipboard}
        className={style.clipBoardContainer({ isCopied })}
      >
        <span className={style.clipBoardText}>{textToCopied}</span>
        <span className={style.clipBoardIconBox}>
          {isCopied ? (
            <Icon icon="check" color={vars.$scale.color.blue700} />
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
