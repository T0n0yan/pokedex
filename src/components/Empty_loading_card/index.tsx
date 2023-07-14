import { FC } from 'react';
import { Card } from 'antd';
import styles from './Empty_Loading_componennt.module.scss';
import { PropagateLoader } from 'react-spinners';

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
