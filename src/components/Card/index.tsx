import { FC } from 'react';
import { Card } from 'antd';
import { TCardProps } from './type';

const { Meta } = Card;

const CardComponent: FC<TCardProps> = ({ url, title, hashId, type }) => (

  <Card
    hoverable
    style={{ width: 240 }}
    // cover={< img alt="pokemon Pic " src={url} />}
  >
    <Meta title={title} description="Pokemon Card" />
    <h3>{title}</h3>
    {/* <p>{hashId}</p>
    <p>{type}</p> */}
  </Card>
);

export default CardComponent;