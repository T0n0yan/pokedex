import { fetchAllPokemon, fetchAlltypes } from 'store/reducers/pokemonSlice';
import EmptyLoadingCard from 'components/Empty_loading_card';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React, { useEffect, useState } from 'react';
import FilteredInput from 'components/Filter_input';
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
  const typeList = useAppSelector((state: RootState) => state.pokemonReducer.typesList);

  const [perPage, setPerPage] = useState<string>('20');
  const [searchInput, setSearchInput] = useState<string>('');
  const [sortOrder, setSortOrder] = useState('Lowest To Highest Number');

  useEffect(() => {
    dispatch(fetchAllPokemon({ perPage }));
    dispatch(fetchAlltypes());
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
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const handleSort = (value: string) => {
    setSortOrder(value);
  };
  return (
    <PageWrapper>
      <h1 className={styles.title}>Pokédex</h1>
      <div className={styles.inputs_container}>
        <div className={styles.filters}>
          <SearchInput value={searchInput} />
          <SelectType typesList={typeList} change={handleChange} />
          <FilteredInput handleSort={handleSort} />
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
