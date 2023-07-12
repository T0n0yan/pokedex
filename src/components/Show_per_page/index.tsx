import { Select } from 'antd';
import styles from './Show_per_page.module.scss';
import { FC } from 'react';

interface IShowPerPage {
    sortChangeOrder: (value: string) => void;
}

const ShowPerPage: FC<IShowPerPage> = ({ sortChangeOrder }) => {
    return (
        <Select
            defaultValue="20"
            onChange={sortChangeOrder}
            options={[
                { value: '10', label: '10' },
                { value: '20', label: '20' },
                { value: '50', label: '50' },
            ]}
            className={styles.drop_down}
        />
    );
};

export default ShowPerPage;
