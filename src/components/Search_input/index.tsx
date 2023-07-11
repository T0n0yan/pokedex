import { FC } from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { TInputSearch } from './type';
import styles from './SearchInput.module.scss'


const SearchInput: FC<TInputSearch> = ({ handleSearch }) => {

    const { Search } = Input;

    return <Search
        className={styles.input}
        placeholder="Search by Name" onSearch={handleSearch}
        enterButton={<button className={styles.button} > <SearchOutlined /></button >
        }
    />

}
export default SearchInput