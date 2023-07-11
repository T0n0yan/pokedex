import { FC, useEffect, useState } from "react";
import styles from './Home.module.scss';
import SearchInput from 'components/Search_input/index';
import PageWrapper from "layout/Page_wrapper";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchAllPokemons, fetchAlltypes } from "store/reducers/pokemonSlice";
import FilteredInput from 'components/Filter_input/index'
import Pagination from "components/Pagination";
import CardComponent from "../../components/Card";
import { Link } from "react-router-dom";
import TypesInput from '../../components/Types_input';

const Home: FC = () => {
    const dispatch = useAppDispatch();
    const [searchPokemon, setSearchPokemon] = useState('');
    const [sortOrder, setSortOrder] = useState('Lowest To Highest Number');
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        dispatch(fetchAllPokemons());
        dispatch(fetchAlltypes())
    }, []);


    const typeList = useAppSelector(state => state.pokemonReducer.typesList)

    const handleSearch = (value: string) => {
        setSearchPokemon(value);
    };

    const handleSortOrderChange = (value: string) => {
        setSortOrder(value);
    };

    const handleTypeChange = (value: string) => {
        setSelectedType(value);
    };

    const handleSort = (value: string) => {
        setSortOrder(value);
    };
    const pokemonData = useAppSelector(state => state.pokemonReducer.pokemonInfo);

    const filteredData = pokemonData?.filter(el => {
        const nameMatches = el.name.toLowerCase().includes(searchPokemon.toLowerCase());
        const typeMatches = selectedType === '' || el.types.some(type => type.type.name === selectedType);
        return nameMatches && typeMatches;
    }).sort((a, b) => {
        if (sortOrder === 'A-Z') {
            return a.name.localeCompare(b.name);
        } else if (sortOrder === 'Z-A') {
            return b.name.localeCompare(a.name);
        } else if (sortOrder === 'Lowest To Highest Number') {
            return a.id - b.id;
        } else if (sortOrder === 'Highers To Lowest Number') {
            return b.id - a.id;
        }
        return 0;
    });
    console.log(typeList);


    return (
        <PageWrapper>
            <h1 className={styles.title}>Pokédex</h1>
            <div className={styles.inputsContainer}>
                <SearchInput handleSearch={handleSearch} />
                <TypesInput  handleType={typeList} />
                <FilteredInput handleSort={handleSort} />
            </div>
            <div className={styles.container}>
                {filteredData ? (
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
                ) : <p className={styles.emptyList}>Nothing was found</p>}
            </div>
            <Pagination page={3} />

        </PageWrapper >
    );
};

export default Home;
