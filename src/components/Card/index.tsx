import { FC } from 'react';
import { Card } from 'antd';
import type { TCardProps } from './type';
import styles from './Cards.module.scss'

const { Meta } = Card;

const CardComponent: FC<TCardProps> = ({ url, title, hashId, types }) => {
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    return (

        <Card
            hoverable
            className={styles.card}
            cover={
                <div className={styles.pokemon_img_container}>
                    <img className={styles.pokemon_img} alt="pokemon Picture" src={url} />
                </div>
            }
        >
            {/* <Meta title={title} /> */}
            <h3 className={styles.pokemon_name}>{capitalizedTitle}</h3>
            <p className={styles.id}>{hashId}</p>
            {types.map(((el, index) => {
                return <span key={index} className={styles.pokemon_type}>{el.type.name}</span>
            }))}
        </Card>
    )
}


export default CardComponent;
