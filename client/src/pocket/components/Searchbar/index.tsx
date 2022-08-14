import { Icon } from '@shared/components';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from 'react';

import useScrollPosition from '../../hooks/useScrollPosition';
import * as style from './style.css';

interface SearchbarInterface {
  searchText?: string;
  changeSearchText: (text: string) => void;
}

const Searchbar: React.FC<SearchbarInterface> = ({ changeSearchText }) => {
  const [text, setText] = useState<string>('');
  const { isScrollTop } = useScrollPosition();

  const onChangeSearchbar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const debouncedChangeSearchText = useCallback(
    debounce((text: string) => changeSearchText(text), 500),
    [],
  );

  useEffect(() => {
    debouncedChangeSearchText(text);
  }, [debouncedChangeSearchText, text]);

  return (
    <div
      className={style.container({
        isScrollTop,
      })}
    >
      <input
        aria-label="파일 검색 입력창"
        placeholder="찾고 싶은 코드나 작성자 이름을 입력해보세요!"
        value={text}
        onChange={onChangeSearchbar}
        className={style.searchbox}
        autoFocus
      />
      <span className={style.searchicon}>
        <Icon icon="search" />
      </span>
    </div>
  );
};

export default Searchbar;
