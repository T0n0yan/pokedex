import { Select } from 'antd';
import { FC, useState } from 'react';
import { PokemonData } from 'store/reducers/types';

import styles from './Selet_type.module.scss';

interface ITypes {
  typesList: PokemonData | null;
  change: (value: string) => void;
}

const SelectType: FC<ITypes> = ({ typesList, change }) => {
  const [selectedType, setSelectedType] = useState('allTypes');

  const handleSelectChange = (value: string) => {
    setSelectedType(value);
    change(value);
  };
  const options = [
    { value: 'allTypes', label: 'All Types' },
    ...(typesList?.results || [])
      .filter(type => type.name !== 'unknown')
      .map(type => ({
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

export default SelectType;
