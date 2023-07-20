import { FC } from 'react';
import { Card } from 'antd';
import { PropagateLoader } from 'react-spinners';

import styles from './Empty_Loading_componennt.module.scss';

const EmptyLoadingCard: FC = () => {
  return (
    <Card className={styles.card}>
      <div className={styles.spin}>
        <PropagateLoader color="#397f84" size={10} />
      </div>
    </Card>
  );
};

export default EmptyLoadingCard;
