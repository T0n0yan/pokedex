import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Pokemon, PokemonUniqeType, initialRootState } from "../reducers/types";
import axios from 'axios'
import { RootState } from "store";

const initialState: initialRootState = {
    pokemonsData: null,
    loading: false,
    error: undefined,
    pokemonInfo: null,
    singlePokemon: null,
    speciesUrl: null,
    typesList: null,
    uniqeIdPokemon: null,
    currentPage: 1,
    nextURL: "",
    previousURL: ""
}
interface IDataUrl {
    perPage: string,
    fetchURl?: string
}
export const fetchAllPokemons = createAsyncThunk("pokemon/fetchAll", async (data: IDataUrl, thunkAPI) => {
    try {
        const state = thunkAPI.getState() as RootState
        const currentPage = state.pokemonReducer.currentPage
        const offset = (currentPage - 1) * (+data.perPage)
        console.log('====================================');
        console.log(data.perPage);
        console.log(currentPage);
        console.log('====================================');
        const { perPage, fetchURl = `https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${offset}` } = data
        // const nextURL  = `${}?offset=${offset}&limit=&{} `
        // https://pokeapi.co/api/v2/pokemon?offset=40&limit=20",

        // "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",

        const response = await axios.get(fetchURl);
        const pokemons = response.data;
        if (pokemons) {
            const pokemonDataPromises = pokemons.results.map(async (pokemon: Pokemon) => {
                const pokemonResponse = await axios.get(pokemon.url);
                return pokemonResponse.data;
            });
            const pokemonsData = await Promise.all(pokemonDataPromises);
            const nextPageURL = pokemons.next
            const previousPageURL = pokemons.previous
            // thunkAPI.dispatch(changePage(currentPage))
            return { pokemons: pokemonsData, pokemonMainData: pokemons, nextPageURL, previousPageURL };
        }
    } catch (err) {
        console.error("Error", err);
        throw new Error("Error with Pokemons data");
    }
});
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
        changePage: (state, action) => {
            state.currentPage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPokemons.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchAllPokemons.fulfilled, (state, action) => {
                state.loading = false;
                state.pokemonInfo = action.payload!.pokemons;
                state.pokemonsData = action.payload!.pokemonMainData;
                state.nextURL = action.payload?.nextPageURL
                state.previousURL = action.payload?.previousPageURL

            })
            .addCase(fetchAllPokemons.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
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
export const { changePage } = pokemonSlice.actions
export default pokemonSlice.reducer