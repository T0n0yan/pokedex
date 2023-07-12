import { FC } from "react";
import { Select } from 'antd';
import styles from './FilterInput.module.scss'


export type TFilteredInput = {
    handleSort: (value: string) => void
}

const FilteredInput: FC<TFilteredInput> = ({ handleSort }) => {
    const sort = (value: string) => {
        handleSort(value);
    };
    return (
        <Select
            defaultValue="Lowest to Highest"
            className={styles.input}
            style={{ width: "25%" }}
            onChange={sort}
            options={[
                { value: 'A-Z', label: 'A-Z' },
                { value: 'Z-A', label: 'Z-A' },
                { value: 'Lowest To Highest Number', label: 'Lowest to Highest' },
                { value: 'Highest To Lowest Number', label: 'Highest to Lowest' },
              ]}
        />
    );
}

export default FilteredInput;
