import React, { FC, useEffect, useState } from "react";
import styles from './Home.module.scss';
import SearchInput from '../../components/Search_input/index';
import PageWrapper from "layout/Page_wrapper";
import Card from "../../components/Card";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchAllPokemons } from "store/reducers/pokemonSlice";


const Home: FC = () => {

    const dispatch = useAppDispatch()


    const handleSearch = (value: string) => {
        console.log('Searched value:', value);
    };
    const pokemonData = useAppSelector(state => state.pokemonReducer.pokemonInfo)

    useEffect(() => {
        dispatch(fetchAllPokemons())
    }, [])
    return (
        <PageWrapper>
            <h1 className={styles.title}> Pokédex </h1>
            <SearchInput width="300px" handleSearch={handleSearch} />
            
            <div className={styles.container}>
                {pokemonData ? pokemonData.map(el => {
                    console.log(el);
                    return (
                        <Card
                            url={el.sprites.other?.["official-artwork"].front_default}
                            title={el.name}
                            hashId={`#${el.id.toString().padStart(3, "0")}`}
                            key={el.id}
                            types={el.types}
                        />
                    )
                }) : "Hello World"}

            </div>
        </PageWrapper>
    )
}

export default Home


