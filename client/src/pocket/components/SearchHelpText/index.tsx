import * as style from './style.css';

interface SearchHelpTextInterface {
  searchText: string;
}

const SearchHelpText: React.FC<SearchHelpTextInterface> = ({ searchText }) => {
  return (
    <div className={style.searchHelpTextBox}>
      <p>
        <span className={style.searchText}>{searchText}</span>
      </p>
    </div>
  );
};

export default SearchHelpText;
