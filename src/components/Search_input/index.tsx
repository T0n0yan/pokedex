import { SearchOutlined } from '@ant-design/icons';
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
    <Search
      style={{ color: '#fff' }}
      placeholder="type Pokemon Name"
      className={styles.input}
      onSearch={onSearch}
      enterButton={
        <button className={styles.button}>
          <SearchOutlined />
        </button>
      }
    />
  );
};

export default SearchInput;
