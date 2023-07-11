import { Select, Space } from 'antd';
import { PokemonData } from '../../store/reducers/types';
import { FC } from 'react';

interface ITypes {
    typesList: PokemonData
}


const TypesInput: FC<ITypes> = ({ typesList }) => {
    return (
        <Space wrap>
            <Select
                defaultValue="All Types"
                style={{ width: 120 }}
                options={[{ value: "kasmdk", label: 'jasndjnj' }]}
            />
        </Space>
    )
};

export default TypesInput
