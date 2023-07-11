import {FC} from "react";
import type {TFilteredInput} from "./types";
import {Select} from 'antd';
import styles from './FilterInput.module.scss'

const FilteredInput: FC<TFilteredInput> = ({ handleSort}) => {
    const sort = (value: string) => {
        handleSort(value); // Call the handleSort function passed as a prop
    };

    return (
        <Select
            defaultValue="Lowest to Highest"
            className={styles.input}
            style={{width: "20%"}}
            onChange={sort}
            options={[
                {value: 'A-Z', label: 'A-Z'},
                {value: 'Z-A', label: 'Z-A'},
                {value: 'Lowest To Highest Number', label: 'Lowest to Highest'},
                {value: 'Highers To Lowest Number', label: 'Highest to Lowest'},
            ]}
        />
    );
}

export default FilteredInput;
