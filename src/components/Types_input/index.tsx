import { Select, Space } from 'antd';
import { FC, useState } from 'react';
import { PokemonData } from 'store/reducers/types';
import styles from './Types.module.scss'
interface ITypes {
    typesList: PokemonData | null;
    handleTypeChange: (value: string) => void;
}

const TypesInput: FC<ITypes> = ({ typesList, handleTypeChange }) => {
    const [selectedType, setSelectedType] = useState('');

    const handleSelectChange = (value: string) => {
        setSelectedType(value);
        handleTypeChange(value);
    };

    const options = [
        { value: '', label: 'All Types' },
        ...(typesList?.results || []).map(type =>
        ({
            value: type.name,
            label: type.name.charAt(0).toUpperCase() + type.name.slice(1)
        }))
    ];

    return (
        <Space  className={styles.body}>
            <Select
                defaultValue="All Types"
                options={options}
                value={selectedType}
                onChange={handleSelectChange}
                className={styles.select}
            />
        </Space>
    );
};

export default TypesInput;
