import React, { FC } from 'react';
import { Spin } from 'antd';
export type TLoader = {
    show: boolean
}


const Loader: FC<TLoader> = () => {
    return <Spin />

};

export default Loader;
