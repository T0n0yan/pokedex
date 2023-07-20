import { PokemonInfo } from 'store/reducers/types';
import { PropagateLoader } from 'react-spinners';
import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import axios from 'axios';

import styles from './Cards.module.scss';
import type { TCardProps } from './type';

const CardComponent: FC<TCardProps> = ({ name, url }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [src, setSrc] = useState('');

  const [pokemonInfo, setpokemonInfo] = useState<PokemonInfo | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url);
        const imageUrl = data?.sprites.other?.['official-artwork'].front_default;
        setpokemonInfo(data);
        setSrc(imageUrl);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [name, url]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLoading(true);
    };
    img.src = src;
  }, [src]);
  const capitalizedTitle = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    pokemonInfo && (
      <Link className={styles.pokemonItem} to={`/pokemon/${pokemonInfo.id}`}>
        <Card
          hoverable
          className={styles.card}
          cover={
            <div className={styles.pokemon_img_container}>
              {!loading ? (
                <div className={styles.loader_cont}>
                  <PropagateLoader color="#397f84" size={10} />
                </div>
              ) : (
                <img className={styles.pokemon_img} alt="pokemon Picture" src={src} onLoad={() => setLoading(true)} />
              )}
            </div>
          }
        >
          <h3 className={styles.pokemon_name}>{capitalizedTitle}</h3>
          <p className={styles.id}>{`#${pokemonInfo.id.toString().padStart(3, '0')}`}</p>
          {pokemonInfo.types.map((el, index) => {
            const separator = index !== pokemonInfo.types.length - 1 ? ', ' : '';
            return (
              <span key={index} className={styles.pokemon_type}>
                {el.type.name}
                {separator}
              </span>
            );
          })}
        </Card>
      </Link>
    )
  );
};

export default CardComponent;
