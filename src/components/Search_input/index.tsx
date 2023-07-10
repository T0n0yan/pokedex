import { FC } from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { TInputSearch } from './type';
import styles from './SearchInput.module.scss'
const SearchInput: FC<TInputSearch> = ({ width, handleSearch }) => {
    const inputStyles = {
        width: width,
    };
    const { Search } = Input;


    return <Search
        className={styles.body}
        style={inputStyles}
        placeholder="Search by Name" onSearch={handleSearch}
        enterButton={<button className={styles.button}> <SearchOutlined /></button >
        }
    />

}
export default SearchInput