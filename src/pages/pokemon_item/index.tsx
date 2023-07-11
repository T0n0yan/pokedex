import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchSinglePokemonById, fetchSpeciesData } from "store/reducers/pokemonSlice";
import PageWrapper from 'layout/Page_wrapper';

const PokemonItem: FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch()
    const singlePokemon = useAppSelector(state => state.pokemonReducer.singlePokemon)
    const url = singlePokemon?.species.url
    const spacesUrlData = useAppSelector(state => state.pokemonReducer.speciesUrl)
    useEffect(() => {
        dispatch(fetchSinglePokemonById(id))
        if (url) {
            dispatch(fetchSpeciesData(url))
        }
    }, [id, url])


    const calcualteHeight = (pokemonHeight: number): string => {
        const meters = pokemonHeight * 0.1;
        const feet = meters * 3.28084;
        const inches = (feet % 1) * 12;
        const roundedFeet = Math.floor(feet);
        const roundedInches = Math.round(inches);
        return `${meters.toFixed(1)}m (${roundedFeet}'${roundedInches}")`;
    }
    const calculateWeight = (pokemonWeight: number): string => {
        const kilograms = pokemonWeight / 10;
        const pounds = kilograms * 2.20462;
        const roundedKilograms = kilograms.toFixed(1);
        const roundedPounds = pounds.toFixed(1);
        return `${roundedKilograms}kg (${roundedPounds}lbs)`
    }

    console.log(spacesUrlData);
    // console.log(spacesUrlData)
    return singlePokemon && spacesUrlData && (
        <PageWrapper>
            <div>
                <h1>{singlePokemon.name.charAt(0).toUpperCase() + singlePokemon.name.slice(1)} #{singlePokemon.id.toString().padStart(3, "0")}</h1>
                <img src={singlePokemon.sprites.other?.["official-artwork"].front_default} alt="" />
                <div>
                    <p>{spacesUrlData.flavor_text_entries[1].flavor_text.replace(/\n/g, " ").replace(/\f/g, "").trim()}</p>
                </div>
                <div>
                    <p>Height</p>
                    <p>{calcualteHeight(singlePokemon.height)}</p>
                </div>
                <div>
                    <p>Weight</p>
                    <p>{calculateWeight(singlePokemon.weight)}</p>
                </div>
                <div>
                    <p>Category</p>
                    {/* <p>{singlePokemon}</p> */}
                </div>

                <div>
                    <p>Types</p>
                    <p>{singlePokemon.types[0].type.name}</p>
                    <p>{singlePokemon.types[1].type.name}</p>
                </div>
                <div>
                    <p>Ability</p>
                    <p>{singlePokemon.abilities[0].ability.name}</p>
                </div>
            </div>
        </PageWrapper>

    );
};

export default PokemonItem;
