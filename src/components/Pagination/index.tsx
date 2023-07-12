import React, { FC } from "react";
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

export type TPagination = {
  page: number | null;
};

const CustomPagination: FC<TPagination> = ({ page }) => {
  if (page === null) {
    return null; // Return null if page is null
  }

  return (
    <Pagination
      defaultCurrent={1}
      total={page}
      showSizeChanger={false}
      style={{ marginTop: '20px', textAlign: 'end' }}
    />
  );
};

export default CustomPagination;
