import { fetchAllPokemons, fetchAlltypes } from "store/reducers/pokemonSlice";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { FC, useEffect, useState } from "react";
import FilteredInput from 'components/Filter_input/index'
import SearchInput from 'components/Search_input/index';
import TypesInput from '../../components/Types_input';
import CardComponent from "../../components/Card";
import Pagination from "components/Pagination";
import PageWrapper from "layout/Page_wrapper";
import styles from './Home.module.scss';
import ShowPerPage from "components/Show_per_page";
import { Link } from "react-router-dom";
import { PokemonInfo } from "store/reducers/types";
import { RootState } from "store";


const Home: FC = () => {
    const dispatch = useAppDispatch();
    const [searchPokemon, setSearchPokemon] = useState('');
    const [sortOrder, setSortOrder] = useState('Lowest To Highest Number');
    const [selectedType, setSelectedType] = useState('allTypes');
    const [perPage, setPerPage] = useState("20")

    const uniqueTypeOfPokemon = useAppSelector((state: RootState) => state.pokemonReducer.uniqeIdPokemon);
    const pokemonData = useAppSelector((state: RootState) => state.pokemonReducer.pokemonInfo);
    const pokemonEachData = selectedType === "allTypes" ? pokemonData : uniqueTypeOfPokemon;
    const typeList = useAppSelector((state: RootState) => state.pokemonReducer.typesList);
    const [filteredData, setFilteredData] = useState(pokemonEachData || []);
    const { count, next, previous } = useAppSelector(state => state.pokemonReducer.pokemonsData!) || {}

    useEffect(() => {
        dispatch(fetchAllPokemons({ perPage }));
        dispatch(fetchAlltypes());
    }, [dispatch, perPage]);

    useEffect(() => {
        const filteredData = pokemonEachData?.filter(el => {
            const nameMatches = el.name.toLowerCase().includes(searchPokemon.toLowerCase());
            const typeMatches = selectedType === 'allTypes' || el.types.some(type => type.type.name === selectedType);
            return nameMatches && typeMatches;
        }).sort((a, b) => {
            if (sortOrder === 'A-Z') {
                return a.name.localeCompare(b.name);
            } else if (sortOrder === 'Z-A') {
                return b.name.localeCompare(a.name);
            } else if (sortOrder === 'Lowest To Highest Number') {
                return a.id - b.id;
            } else if (sortOrder === 'Highest To Lowest Number') {
                return b.id - a.id;
            }
            return 0;
        });
        setFilteredData(filteredData || []);
    }, [pokemonEachData, searchPokemon, selectedType, sortOrder, perPage]);

    const handleSearch = (value: string) => {
        setSearchPokemon(value);
    };

    const handleTypeChange = (value: string) => {
        setSelectedType(value);
    };

    const handleSort = (value: string) => {
        setSortOrder(value);
    };

    const handlePerPage = (value: string) => {
        setPerPage(value);
    };

    return (
        <PageWrapper>
            <h1 className={styles.title}>Pokédex</h1>
            <div className={styles.inputs_container}>
                <div className={styles.inputs}>
                    <SearchInput handleSearch={handleSearch} />
                    <TypesInput typesList={typeList} handleTypeChange={handleTypeChange} />
                    <FilteredInput handleSort={handleSort} />
                </div>
                <div className={styles.per_page}>
                    <span className={styles.per_page_text}>Show Per Page:</span>
                    <ShowPerPage sortChangeOrder={handlePerPage} />
                </div>
            </div>
            <div className={styles.container}>
                {filteredData.length ? (
                    filteredData.map(el => (
                        <Link className={styles.pokemonItem} to={`/pokemon/${el.id}`} key={el.id}>
                            <CardComponent
                                url={el.sprites.other?.["official-artwork"].front_default}
                                title={el.name}
                                hashId={`#${el.id.toString().padStart(3, "0")}`}
                                types={el.types}
                            />
                        </Link>
                    ))
                ) : (
                    <p className={styles.emptyList}>Nothing was found</p>
                )}
            </div>
            <Pagination page={count} perPage={perPage} />
        </PageWrapper>
    );
};

export default Home;