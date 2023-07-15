import React, { FC } from 'react';
import { Select } from 'antd';
import styles from './Selet_type.module.scss';
interface ISelectType {
  type: string;
}

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
const SelectType: FC<ISelectType> = () => {
  return (
    <div className={styles.type_input}>
      <Select
        defaultValue="All Types"
        style={{
          width: 120,
        }}
        onChange={handleChange}
        options={[
          {
            value: 'All Types',
            label: 'All Types',
          },
        ]}
      />
    </div>
  );
};

export default SelectType;
