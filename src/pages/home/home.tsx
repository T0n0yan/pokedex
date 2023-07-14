import PageWrapper from "layout/Page_wrapper";
import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { RootState } from "store";
import CardComponent from "components/Card";
import { fetchAllPokemons } from "store/reducers/pokemonSlice";
import { Link } from "react-router-dom";
import EmptyLoadingCard from "components/EmptyLoadingCard";
import { PropagateLoader } from "react-spinners";
import ShowPerPage from "./../../components/Show_per_page/index";
import  Pagination  from '../../components/Pagination';
const Home = () => {
    const dispatch = useAppDispatch();
    const pokemonsData = useAppSelector((state: RootState) => state.pokemonReducer.pokemonsData);
    const isLoading = useAppSelector((state: RootState) => state.pokemonReducer.loading);

    const [perPage, setPerPage] = useState("20");

    useEffect(() => {
        dispatch(fetchAllPokemons({ perPage }));
    }, [dispatch, perPage]);

    const array = new Array(+perPage).fill("").map((_, index) => {
        return index;
    });
    const handlePerPage = (value: string) => {
        setPerPage(value);
    };

    return (
        <PageWrapper>
            <h1 className={styles.title}>Pokédex</h1>
            <div className={styles.inputs_container}>
                <div className={styles.per_page}>
                    <span className={styles.per_page_text}>Show Per Page:</span>
                    <ShowPerPage sortChangeOrder={handlePerPage} />
                </div>
            </div>
            <div className={styles.container}>
                {isLoading ? (
                    array.map((_ , index) => {
                        return <EmptyLoadingCard key={index} />;
                    })
                ) : pokemonsData && pokemonsData.results.length ? (
                    pokemonsData.results.map((pokemon, index) => (
                        <CardComponent url={pokemon.url} name={pokemon.name} key={index} />
                    ))
                ) : (
                    <div className={styles.loading}>
                        <PropagateLoader color="#397f84" size={10} />
                    </div>
                )}
            </div>
            {pokemonsData?.count && <Pagination total={pokemonsData.count} perPage={perPage} />}
        </PageWrapper>
    );
};

export default Home;
