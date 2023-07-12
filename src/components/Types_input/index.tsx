import { Select, Space } from 'antd';
import { FC, useState } from 'react';
import { PokemonData } from 'store/reducers/types';
import styles from './Types.module.scss'
import { useAppDispatch } from 'hooks/redux';
import { fetchPokemonByType } from 'store/reducers/pokemonSlice';
interface ITypes {
    typesList: PokemonData | null;
    handleTypeChange: (value: string) => void;
}

const TypesInput: FC<ITypes> = ({ typesList, handleTypeChange }) => {
    const [selectedType, setSelectedType] = useState('allTypes');
    const dispatch = useAppDispatch()
    const handleSelectChange = (value: string) => {
        setSelectedType(value);
        handleTypeChange(value);
        if (typesList) {
            typesList.results.filter((type) => type.name === value).map((el) => {
                dispatch(fetchPokemonByType(el.url))
            })
        }
    };
    const options = [
        { value: 'allTypes', label: 'All Types' },
        ...(typesList?.results || [])
            .filter((type) => type.name !== 'unknown')
            .map((type) => ({
                value: type.name,
                label: type.name.charAt(0).toUpperCase() + type.name.slice(1),
            })),
    ];
    return (
        <div className={styles.container}>
            <Select
                defaultValue="allTypes"
                options={options}
                value={selectedType}
                onChange={handleSelectChange}
                className={styles.select}
            />
        </div>

    );
};

export default TypesInput;
