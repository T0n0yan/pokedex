import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Pokemon, PokemonInfo, RootState } from "../reducers/types";
import axios from 'axios'

const initialState: RootState = {
    pokemonsData: null,
    loading: false,
    error: undefined,
    pokemonInfo: null,
    singlePokemon: null,
    speciesUrl: null,
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


            .addCase(fetchSpeciesData.pending, (state, action) => {
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

    },
})
export const { actions } = pokemonSlice
export default pokemonSlice.reducer

