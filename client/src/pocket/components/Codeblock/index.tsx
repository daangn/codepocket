import { colors } from '@karrotmarket/design-token';
import { Icon, IconButton } from '@shared/components';
import useClipboard from '@shared/hooks/useClipboard';
import { localStorage } from '@shared/utils/localStorage';
import { useCallback, useMemo, useRef, useState } from 'react';
import SyntaxHighlighter, { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { generateDetailPath } from '../../../routes';
import { useModalDispatch } from '../../contexts/ModalContext';
import * as style from './style.css';

export interface CodeblockProps {
  userId: string;
  codeId: string;
  codeAuthor: string;
  codeName: string;
  code: string;
  isAnonymous: boolean;
}

const Codeblock: React.FC<CodeblockProps> = ({
  userId,
  codeId,
  codeAuthor,
  codeName,
  code,
  isAnonymous,
}: CodeblockProps) => {
  const modalDispatch = useModalDispatch();
  const [toggled, setToggled] = useState<boolean>(false);
  const { isCopied, copyToClipboard } = useClipboard({ text: code });
  const syntaxHighlighterRef = useRef<React.Component<SyntaxHighlighterProps>>(null);
  const isCodeOwner = useMemo(() => userId === localStorage.getUserId(), [userId]);

  const toggle = useCallback(() => setToggled((prev) => !prev), []);
  const toggleDeleteModal = useCallback(
    () => modalDispatch({ type: 'TOGGLE_DELETE_MODAL' }),
    [modalDispatch],
  );
  const toggleEditModal = useCallback(
    () => modalDispatch({ type: 'TOGGLE_EDIT_MODAL' }),
    [modalDispatch],
  );

  const haveManyCode = useMemo(() => {
    const MANY_CODE_STANDARD_LINE = 500;
    return code.length > MANY_CODE_STANDARD_LINE;
  }, [code.length]);

  return (
    <li className={style.codeItem}>
      <div className={style.codeItemHeaderInfo}>
        <div className={style.codeItemHeaderCodeName}>
          <Icon icon="code" />
          <span>{codeName}</span>
        </div>
        {!isAnonymous && (
          <div className={style.codeItemHeaderCodeAuthor}>
            <Icon icon="profile" />
            <span>{codeAuthor}</span>
          </div>
        )}
      </div>
      <div
        className={style.codeItemCode({
          haveManyCode,
          toggled,
        })}
        onClick={toggle}
      >
        <SyntaxHighlighter
          ref={syntaxHighlighterRef}
          showLineNumbers
          wrapLongLines={false}
          language="javascript"
          style={githubGist}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <div className={style.codeItemBottom}>
        <div className={style.codeItemBottomButtons}>
          {isCodeOwner && <IconButton onClick={toggleDeleteModal} icon={<Icon icon="delete" />} />}
          {isCodeOwner && <IconButton onClick={toggleEditModal} icon={<Icon icon="edit" />} />}
        </div>
        <div className={style.codeItemBottomButtons}>
          <button
            type="button"
            aria-label="코드 복사 버튼"
            className={style.codeItemHeaderCopyButton}
            onClick={copyToClipboard}
          >
            {isCopied ? 'COPIED!' : 'COPY'}
          </button>
          <a href={generateDetailPath({ codeId })}>
            <button
              type="button"
              aria-details="코드 상세페이지 이동 버튼"
              className={style.codeItemHeaderDetailButton}
            >
              <span>DETAIL</span>
              <span className={style.rightChevronIcon}>
                <Icon icon="rightChevron" color={colors.light.scheme.$blue800} />
              </span>
            </button>
          </a>
        </div>
      </div>
    </li>
  );
};

export default Codeblock;
