import { colors } from '@karrotmarket/design-token';
import Icon from '@shared/components/Icon';
import to from 'await-to-js';
import { useMemo, useRef, useState } from 'react';
import SyntaxHighlighter, { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { generateDetailPath } from '../../../routes';
import * as style from './style.css';

export interface CodeblockProps {
  codeAuthor: string;
  codeName: string;
  code: string;
}

const Codeblock: React.FC<CodeblockProps> = (props) => {
  const { codeAuthor, codeName, code }: CodeblockProps = props;
  const [toggled, setToggled] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const syntaxHighlighterRef = useRef<React.Component<SyntaxHighlighterProps>>(null);

  const toggle = () => setToggled((prev) => !prev);

  const haveManyCode = useMemo(() => {
    const MANY_CODE_STANDARD_LINE = 500;
    return code.length > MANY_CODE_STANDARD_LINE;
  }, [code.length]);

  const copyToClipboard = async () => {
    const [error] = await to(navigator.clipboard.writeText(code));
    if (error) setIsCopied(false);
    else {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <li className={style.codeItem}>
      <header className={style.codeItemHeader}>
        <div className={style.codeItemHeaderInfo}>
          <Icon icon="code" />
          <span>
            {codeAuthor}/{codeName}
          </span>
        </div>

        <div className={style.codeItemHeaderButtons}>
          <button
            type="button"
            aria-label="코드 복사 버튼"
            className={style.codeItemHeaderCopyButton}
            onClick={copyToClipboard}
          >
            {isCopied ? 'COPIED!' : 'COPY'}
          </button>
          <a href={generateDetailPath({ codeAuthor, codeName })}>
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
      </header>
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
    </li>
  );
};

export default Codeblock;
