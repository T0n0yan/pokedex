import {FC, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {fetchSinglePokemonById, fetchSpeciesData} from "store/reducers/pokemonSlice";
import PageWrapper from "layout/Page_wrapper";
import styles from "./Pokemon_types.module.scss";
import Stats from "components/Stats";
import Evolution from "components/Evolution";

const PokemonItem: FC = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const singlePokemon = useAppSelector(state => state.pokemonReducer.singlePokemon);
    const url = singlePokemon?.species.url;
    const spacesUrlData = useAppSelector(state => state.pokemonReducer.speciesUrl);
    useEffect(() => {
        dispatch(fetchSinglePokemonById(id));
        if (url) {
            dispatch(fetchSpeciesData(url));
        }
    }, [id, url]);

    const calcualteHeight = (pokemonHeight: number): string => {
        const meters = pokemonHeight * 0.1;
        const feet = meters * 3.28084;
        const inches = (feet % 1) * 12;
        const roundedFeet = Math.floor(feet);
        const roundedInches = Math.round(inches);
        return `${meters.toFixed(1)}m (${roundedFeet}'${roundedInches}")`;
    };
    const calculateWeight = (pokemonWeight: number): string => {
        const kilograms = pokemonWeight / 10;
        const pounds = kilograms * 2.20462;
        const roundedKilograms = kilograms.toFixed(1);
        const roundedPounds = pounds.toFixed(1);
        return `${roundedKilograms}kg (${roundedPounds}lbs)`;
    };

    return (
        singlePokemon &&
        spacesUrlData && (
            <PageWrapper>
                <div className={styles.container}>
                    <Link to="/" className={styles.link}>
                        ← Explore more Pokémon
                    </Link>
                    <h1 className={styles.title}>
                        {singlePokemon.name.charAt(0).toUpperCase() + singlePokemon.name.slice(1)} #
                        {singlePokemon.id.toString().padStart(3, "0")}
                    </h1>
                    <div className={styles.img_description_cont}>
                        <img
                            className={styles.img}
                            width={400}
                            height={400}
                            src={singlePokemon.sprites.other?.["official-artwork"].front_default}
                            alt="Pokemon Each Photo"
                        />

                        <div className={styles.description_cont}>
                            <div>
                                <p>{spacesUrlData.flavor_text_entries[1].flavor_text.replace(/\n/g, " ").replace(/\f/g, "").trim()}</p>
                            </div>
                            <div className={styles.pokemin_abilities_info}>
                                <div className={styles.pokemon_each_info}>
                                    <p className={styles.abilities_name}>Height</p>
                                    <p>{calcualteHeight(singlePokemon.height)}</p>
                                </div>
                                <div className={styles.pokemon_each_info}>
                                    <p className={styles.abilities_name}>Weight</p>
                                    <p>{calculateWeight(singlePokemon.weight)}</p>
                                </div>
                                <div className={styles.pokemon_each_info}>
                                    <p className={styles.abilities_name}>Category</p>
                                    <p>{spacesUrlData.genera[7].genus.split(" ")[0]}</p>
                                </div>
                                <div className={styles.pokemon_each_info}>
                                    <p className={styles.abilities_name}>Types</p>
                                    {singlePokemon.types.map((el, index) => {
                                        return <p key={index}>{el.type.name}</p>;
                                    })}
                                </div>
                                <div className={styles.pokemon_each_info}>
                                    <p className={styles.abilities_name}>Ability</p>
                                    <p>{singlePokemon.abilities[0].ability.name}</p>
                                </div>
                                <div className={styles.pokemon_each_info}>
                                    <p className={styles.abilities_name}>Gender</p>
                                    {spacesUrlData.gender_rate >= 1 ? (
                                        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                                            <span>male</span>
                                            <span>female</span>
                                        </div>
                                    ) : spacesUrlData.gender_rate === 0 ? (
                                        <p>male</p>
                                    ) : (
                                        <p>none</p>
                                    )}
                                </div>
                                <div className={styles.stats}>
                                    <Stats stats={singlePokemon.stats}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.evolution_cont}>
                        <Evolution url={spacesUrlData.evolution_chain.url}/>
                    </div>
                </div>
            </PageWrapper>
        )
    );
};

export default PokemonItem;
