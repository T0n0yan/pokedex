import { FC, useState } from "react";
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

export type TPagination = {
    page: number
}


const CustomPagination: FC<TPagination> = ({ page }) => {
    const [current, setCurrent] = useState(page);
    const onChange: PaginationProps['onChange'] = page => {
        setCurrent(page);
    };
    return (
        <Pagination
            total={50}
            responsive
            current={current}
            onChange={onChange}
            style={{ marginTop: '20px', textAlign: 'end' }}
        />
    );
};

export default CustomPagination;
