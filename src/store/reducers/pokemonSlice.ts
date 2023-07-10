import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../reducers/types";
import axios from 'axios'
//  skzbnakan arjeq
const initialState: RootState = {

    pokemonsData: null,
    loading: false,
    error: undefined,
 
}
export const fetchAllPokemons = createAsyncThunk("pokemon/fetchAll", async () => {
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon" )
        return response.data
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
                console.log(action.payload.results)
                state.loading = false;
                state.pokemonsData = action.payload;
        
            })
            .addCase(fetchAllPokemons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    },
})
export const { actions } = pokemonSlice
export default pokemonSlice.reducer

