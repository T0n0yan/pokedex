import React, {FC} from 'react';
import type {TLoader} from "./types";
import {Spin} from 'antd';


const Loader: FC<TLoader> = () => {
    return <Spin/>

};

export default Loader;
