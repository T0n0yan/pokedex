import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Pokemon, PokemonInfo, RootState } from "../reducers/types";
import axios from 'axios'
//  skzbnakan arjeq
const initialState: RootState = {
    pokemonsData: null,
    loading: false,
    error: undefined,
    pokemonInfo: null
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

const pokemonSlice = createSlice({
    name: "Pokemon",
    initialState,
    reducers: {
    },
    //for async
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
            });

    },
})
export const { actions } = pokemonSlice
export default pokemonSlice.reducer

