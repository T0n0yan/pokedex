import { FC, useEffect, useState } from 'react';
import { Card } from 'antd';
import type { TCardProps } from './type';
import styles from './Cards.module.scss';
import { PokemonInfo } from 'store/reducers/types';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CardComponent: FC<TCardProps> = ({ name, url }) => {
  const [pokemonInfo, setpokemonInfo] = useState<PokemonInfo | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(url);
        setpokemonInfo(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [name, url]);

  const capitalizedTitle = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    pokemonInfo && (
      <Link className={styles.pokemonItem} to={`/pokemon/${pokemonInfo.id}`}>
        <Card
          hoverable
          className={styles.card}
          cover={
            <div className={styles.pokemon_img_container}>
              <img
                className={styles.pokemon_img}
                alt="pokemon Picture"
                src={pokemonInfo.sprites.other?.['official-artwork'].front_default}
              />
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
