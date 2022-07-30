import { CodeList, MoreButton, PendingFallback, Searchbar, SearchHelpText } from './components';
import useCodes from './hooks/useCodes';
import * as style from './style.css';

const PocketPage: React.FC = () => {
  const { codes, isLast, hasData, searchText, isLoading, changeSearchText, getNextCodes } =
    useCodes();

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>Codepocket</h1>
      <Searchbar searchText={searchText} changeSearchText={changeSearchText} />
      {searchText ? <SearchHelpText searchText={searchText} /> : null}
      <CodeList codes={codes} />
      {isLoading ? <PendingFallback /> : null}
      <MoreButton isLoading={isLoading} hasData={hasData} isLast={isLast} onClick={getNextCodes} />
    </div>
  );
};

export default PocketPage;
