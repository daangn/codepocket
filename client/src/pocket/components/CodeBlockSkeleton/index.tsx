import * as style from './style.css';

const CodeblockSkeleton = () => {
  return (
    <div className={style.codeItem}>
      <div className={style.codeItemHeaderInfo}>
        <div className={style.codeItemHeaderCodeName}>
          <span className={style.CodeNameSkeleton} />
        </div>
        <div className={style.codeItemHeaderCodeAuthor}>
          <span className={style.AuthorNameSkeleton} />
        </div>
      </div>
      <div className={style.codeItemCode} />
      <div className={style.codeItemBottom}>
        <div className={style.codeItemHeaderButtons}>
          <div className={style.codeItemHeaderCopyButton} />
          <div>
            <div className={style.codeItemHeaderDetailButton} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeblockSkeleton;
