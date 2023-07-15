import { Pokemon, SinglePokemonData } from 'store/reducers/types';
import React, { FC, useEffect, useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import styles from './Evolution.module.scss';
import CardComponent from 'components/Card';
import axios from 'axios';

type TEvolutionProps = {
  url?: string; // Species ID to get its evolved form data
};

const Evolution: FC<TEvolutionProps> = ({ url }) => {
  const [speciesData, setSpeciesData] = useState<Pokemon[]>([]);
  const [pokemonDataState, setPokemonDataDataState] = useState<SinglePokemonData[]>([]);

  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        if (url) {
          const response = await axios.get(url);
          const chain = response.data.chain;
          const species = [
            chain.species,
            ...chain.evolves_to.map((evolution: any) => evolution.species),
            ...chain.evolves_to.flatMap((evolution: any) =>
              evolution.evolves_to.map((subEvolution: any) => subEvolution.species)
            ),
          ];
          const additionalSpeciesData = await Promise.all(
            species.map(async pokemon => {
              const additionalResponse = await axios.get(pokemon.url);
              return additionalResponse.data;
            })
          );
          setSpeciesData(species);
          setPokemonDataDataState(additionalSpeciesData);
          console.log(additionalSpeciesData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpeciesData();
  }, [url]);
  return (
    speciesData &&
    pokemonDataState && (
      <div className={styles.evolution_container}>
        {pokemonDataState.map((pokemon, index) => {
          return (
            <div key={index} className={styles.evolution_item}>
              <div>
                <CardComponent url={pokemon.varieties[0].pokemon.url} name={pokemon.varieties[0].pokemon.name} />
              </div>
              <div className={styles.arrow_cont}>
                <RightOutlined className={styles.arrow} />
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Evolution;
