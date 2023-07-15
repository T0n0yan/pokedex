import React, { FC } from 'react';
import { Input } from 'antd';
import styles from './Search_input.module.scss';

interface ISearchInput {
  value: string;
}

const { Search } = Input;

const onSearch = (value: string) => console.log(value);

const SearchInput: FC<ISearchInput> = () => {
  return (
    <div className={styles.search_input}>
      <Search placeholder="type Pokemon Name" onSearch={onSearch} enterButton />
    </div>
  );
};

export default SearchInput;
