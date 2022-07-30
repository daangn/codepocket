/* eslint-disable no-nested-ternary */
import * as style from './style.css';

interface MoreButtonInterface {
  onClick: () => void;
  isLast: boolean | undefined;
  hasData: boolean;
  isLoading: boolean;
}

const MoreButton: React.FC<MoreButtonInterface> = ({ onClick, isLast, hasData, isLoading }) => {
  return (
    <button
      disabled={isLast}
      onClick={onClick}
      className={isLast || isLoading ? style.disableMoreButton : style.moreButton}
    >
      {isLast ? (hasData ? '검색 결과에 해당하는 코드가 없어요' : '마지막 코드에요') : 'MORE'}
    </button>
  );
};

export default MoreButton;
