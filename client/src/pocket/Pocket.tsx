import { CodeList, MoreButton, Searchbar, SearchHelpText } from './components';
import CodeblockSkeleton from './components/CodeBlockSkeleton';
import ErrorMessage from './components/ErrorMessage';
import useCodes from './hooks/useCodes';
import * as style from './style.css';

const SKELETON_COUNT = 4;

const PocketPage: React.FC = () => {
  const { codes, error, isLast, searchText, isLoading, changeSearchText, getNextCodes } =
    useCodes();

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Codepocket</h1>
      <Searchbar searchText={searchText} changeSearchText={changeSearchText} />
      {searchText ? <SearchHelpText searchText={searchText} /> : null}
      <CodeList codes={codes} />
      {isLoading &&
        Array(SKELETON_COUNT)
          .fill(0)
          .map(() => <CodeblockSkeleton />)}
      {!isLoading &&
        (!error ? (
          <MoreButton
            isLoading={isLoading}
            isSearch={!!searchText}
            hasCode={!!codes.length}
            isLast={isLast}
            onClick={getNextCodes}
          />
        ) : (
          <ErrorMessage message={error.response.data.message} />
        ))}
    </div>
  );
};

export default PocketPage;
