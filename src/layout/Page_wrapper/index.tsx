import { FC } from 'react';

import styles from './Page_wrapper.module.scss';
import { IPageWrapperProps } from './types';

const PageWrapper: FC<IPageWrapperProps> = ({ children, className }) => {
  return <div className={`${className} ${styles.container}`}>{children}</div>;
};

export default PageWrapper;
