import { vars } from '@seed-design/design-token';
import { Icon, IconButton } from '@shared/components';
import { modals } from '@shared/contexts/GlobalModal';
import { useModalDispatch } from '@shared/contexts/ModalContext';
import useClipboard from '@shared/hooks/useClipboard';
import { localStorage } from '@shared/utils/localStorage';
import { useCallback, useMemo, useRef, useState } from 'react';
import SyntaxHighlighter, { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { generateDetailPath } from '../../../routes';
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
  const [toggled, setToggled] = useState<boolean>(false);
  const { isCopied, copyToClipboard } = useClipboard({ text: code });
  const syntaxHighlighterRef = useRef<React.Component<SyntaxHighlighterProps>>(null);
  const isCodeOwner = useMemo(() => userId === localStorage.getUserId(), [userId]);
  const modalDispatch = useModalDispatch();

  const toggle = useCallback(() => setToggled((prev) => !prev), []);
  const openModal = useCallback(
    (modal: 'delete' | 'edit') =>
      modalDispatch({
        type: 'OPEN_MODAL',
        targetId: codeId,
        Component: modal === 'delete' ? modals.deleteModal : modals.editModal,
      }),
    [codeId, modalDispatch],
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
          {isCodeOwner && (
            <IconButton onClick={() => openModal('delete')} icon={<Icon icon="delete" />} />
          )}
          {isCodeOwner && (
            <IconButton onClick={() => openModal('edit')} icon={<Icon icon="edit" />} />
          )}
        </div>
        <div className={style.codeItemBottomButtons}>
          <button
            type="button"
            aria-label="코드 복사 버튼"
            className={style.codeItemHeaderCopyButton}
            onClick={copyToClipboard}
          >
            {isCopied ? 'COPIED' : 'COPY'}
          </button>
          <a href={generateDetailPath({ codeId })}>
            <button
              type="button"
              aria-details="코드 상세페이지 이동 버튼"
              className={style.codeItemHeaderDetailButton}
            >
              <span>DETAIL</span>
              <span className={style.rightChevronIcon}>
                <Icon icon="rightChevron" color={vars.$scale.color.blue700} />
              </span>
            </button>
          </a>
        </div>
      </div>
    </li>
  );
};

export default Codeblock;
