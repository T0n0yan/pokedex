import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Pokemon, PokemonUniqeType, RootState } from "../reducers/types";
import axios from 'axios'

const initialState: RootState = {
    pokemonsData: null,
    loading: false,
    error: undefined,
    pokemonInfo: null,
    singlePokemon: null,
    speciesUrl: null,
    typesList: null,
    uniqeIdPokemon: null,
}


export const fetchAllPokemons = createAsyncThunk("pokemon/fetchAll", async () => {
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon")
        const pokemons = response.data
        if (pokemons) {
            const pokemonDataPromises = pokemons.results.map(async (pokemon: Pokemon) => {
                const pokemonResponse = await axios.get(pokemon.url)
                return pokemonResponse.data
            })
            const pokemonsData = await Promise.all(pokemonDataPromises)
            return pokemonsData
        }

    } catch (err) {
        console.error("Error", err)
    }
})
export const fetchSinglePokemonById = createAsyncThunk("pokemon/fetchById", async (id: string | undefined) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return response.data
    } catch (err) {
        console.error("Error Id", err)
    }
})
export const fetchSpeciesData = createAsyncThunk("pokemon/fetchSpaciesData", async (url: string) => {
    try {
        const response = await axios.get(url)
        return response.data
    } catch (err) {
        console.error("Error Species url not exsist", err)
    }
})
export const fetchAlltypes = createAsyncThunk("pokemons/type", async () => {
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/type")
        return response.data
    } catch (err) {
        console.error("Types error ", err)
    }
})


export const fetchPokemonByType = createAsyncThunk("pokemon/unique/type", async (typeUrl: string) => {
    try {
        const response = await axios.get(typeUrl)
        const uniqePokemonTypes = response.data.pokemon
        console.log("uniqe from promise", uniqePokemonTypes)
        if (uniqePokemonTypes) {
            const pokeomUniqeType = uniqePokemonTypes.map(async (pokemon: PokemonUniqeType) => {
                const pokemonResponse = await axios.get(pokemon.pokemon.url)
                return pokemonResponse.data
            })
            const pokemonsType = await Promise.all(pokeomUniqeType)
            return pokemonsType
        }
    } catch (err) {
        console.error("Error pokemon unique type", err)
    }
})
const pokemonSlice = createSlice({
    name: "Pokemon",
    initialState,
    reducers: {
    },

    extraReducers: (builder) => {
        builder

            .addCase(fetchAllPokemons.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchAllPokemons.fulfilled, (state, action) => {
                state.loading = false;
                state.pokemonInfo = action.payload!;
            })
            .addCase(fetchAllPokemons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(fetchSinglePokemonById.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchSinglePokemonById.fulfilled, (state, action) => {
                state.loading = false;
                state.singlePokemon = action.payload;
            })
            .addCase(fetchSinglePokemonById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


            .addCase(fetchSpeciesData.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchSpeciesData.fulfilled, (state, action) => {
                state.loading = false
                state.speciesUrl = action.payload
            })
            .addCase(fetchSpeciesData.rejected, (state, actions) => {
                state.loading = false
                state.error = actions.error.message
            })


            .addCase(fetchAlltypes.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchAlltypes.fulfilled, (state, action) => {
                state.loading = false
                state.typesList = action.payload
            })
            .addCase(fetchAlltypes.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })


            .addCase(fetchPokemonByType.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchPokemonByType.fulfilled, (state, action) => {
                state.loading = false
                state.uniqeIdPokemon = action.payload!
            })
            .addCase(fetchPokemonByType.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message;
            })
    },
})
export const { actions } = pokemonSlice
export default pokemonSlice.reducer

