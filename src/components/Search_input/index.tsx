import { FC } from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './SearchInput.module.scss'

export type TInputSearch = {
    handleSearch: (value: string) => void
}

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