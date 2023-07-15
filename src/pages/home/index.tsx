import { fetchAllPokemon } from 'store/reducers/pokemonSlice';
import EmptyLoadingCard from 'components/Empty_loading_card';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect, useState } from 'react';
import ShowPerPage from 'components/Show_per_page';
import SearchInput from 'components/Search_input';
import { PropagateLoader } from 'react-spinners';
import SelectType from 'components/Select_type';
import Pagination from 'components/Pagination';
import PageWrapper from 'layout/Page_wrapper';
import CardComponent from 'components/Card';
import styles from './Home.module.scss';
import { RootState } from 'store';

const Home = () => {
  const dispatch = useAppDispatch();
  const pokemonsData = useAppSelector((state: RootState) => state.pokemonReducer.pokemonsData);
  const isLoading = useAppSelector((state: RootState) => state.pokemonReducer.loading);

  const [perPage, setPerPage] = useState('20');
  const [searchInput, setSearchInput] = useState<string>('asd');

  useEffect(() => {
    dispatch(fetchAllPokemon({ perPage }));
  }, [dispatch, perPage]);

  const array = new Array(+perPage).fill('').map((_, index) => {
    return index;
  });
  const handlePerPage = (value: string) => {
    setPerPage(value);
  };
  const handleSearchInput = (value: string) => {
    setSearchInput(value);
  };
  return (
    <PageWrapper>
      <h1 className={styles.title}>Pokédex</h1>
      <div className={styles.inputs_container}>
        <div className={styles.filters}>
          <SearchInput value={searchInput} />
          <SelectType type={'aksmdk'} />
        </div>
        <div className={styles.per_page}>
          <ShowPerPage sortChangeOrder={handlePerPage} />
          <span className={styles.per_page_text}>Show Per Page:</span>
        </div>
      </div>
      <div className={styles.container}>
        {isLoading ? (
          array.map((_, index) => {
            return <EmptyLoadingCard key={index} />;
          })
        ) : pokemonsData && pokemonsData.results.length ? (
          pokemonsData.results.map((pokemon, index) => (
            <CardComponent url={pokemon.url} name={pokemon.name} key={index} />
          ))
        ) : (
          <div className={styles.loading}>
            <div className={styles.loader} style={{ margin: ' 50px auto' }}>
              <PropagateLoader color="#397f84" size={10} />
            </div>
          </div>
        )}
      </div>
      {pokemonsData?.count && <Pagination total={pokemonsData.count} perPage={perPage} />}
    </PageWrapper>
  );
};

export default Home;
