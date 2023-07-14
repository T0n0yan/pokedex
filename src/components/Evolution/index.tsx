import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { Pokemon, SinglePokemonData } from "store/reducers/types";
import CardComponent from "components/Card";

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
                            evolution.evolves_to.map((subEvolution: any) => subEvolution.species),
                        ),
                    ];
                    const additionalSpeciesData = await Promise.all(
                        species.map(async pokemon => {
                            const additionalResponse = await axios.get(pokemon.url);
                            return additionalResponse.data;
                        }),
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
            <div>
                {pokemonDataState.map((pokemon, index) => {
                    return (
                        <div key={index}>
                            <CardComponent url={pokemon.varieties[0].pokemon.url} name={pokemon.varieties[0].pokemon.name} />;
                            <p>slaq</p>
                        </div>
                    );
                })}
            </div>
        )
    );
};

export default Evolution;
