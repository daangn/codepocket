/* eslint-disable no-nested-ternary */
import * as style from './style.css';

interface MoreButtonInterface {
  onClick: () => void;
  isSearch: boolean;
  isLast: boolean | undefined;
  hasCode: boolean;
  isLoading: boolean;
}

const MoreButton: React.FC<MoreButtonInterface> = ({
  onClick,
  isSearch,
  isLast,
  hasCode,
  isLoading,
}) => {
  const getMessage = () => {
    if (!isLast) return 'MORE';
    if (!hasCode && isSearch) return '검색 결과에 해당하는 코드가 없어요';
    if (!hasCode && !isSearch) return '빈 레지스트리예요';
    return '마지막 코드예요';
  };

  return (
    <button
      disabled={isLast}
      onClick={onClick}
      className={isLast || isLoading ? style.disableMoreButton : style.moreButton}
    >
      {getMessage()}
    </button>
  );
};

export default MoreButton;
