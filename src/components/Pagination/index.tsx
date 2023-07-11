import { FC, useState } from "react";
import { TPagination } from "./types";
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

const CustomPagination: FC<TPagination> = ({ page }) => {
    const [current, setCurrent] = useState(page);
    const onChange: PaginationProps['onChange'] = page => {
        console.log(page);
        setCurrent(page);
    };
    return (
        <Pagination
            total={50}
            responsive
            current={current}
            onChange={onChange}
        />
    );
};

export default CustomPagination;
