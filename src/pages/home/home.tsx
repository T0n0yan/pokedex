import React, { FC, useEffect, useState } from "react";
import styles from './Home.module.scss';
import SearchInput from '../../components/Search_input/index';
import PageWrapper from "layout/Page_wrapper";
import Card from "../../components/Card";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchAllPokemons } from "store/reducers/pokemonSlice";


const Home: FC = () => {

    const dispatch = useAppDispatch()

    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (value: string) => {
        console.log('Searched value:', value);
    };
    const pokemonData = useAppSelector(state => state.pokemonReducer.pokemonsData)
    console.log(pokemonData);

    useEffect(() => {
        dispatch(fetchAllPokemons())
    }, [])
    return (
        <PageWrapper>
            <>
                <h1 className={styles.title}> Pokédex </h1>
                <SearchInput width="300px" handleSearch={handleSearch} />
                {pokemonData && pokemonData.results.map((el, index) => {
                    return <Card title={el.name} key={index} />
                })}
            </>
        </PageWrapper>
    )
}

export default Home


