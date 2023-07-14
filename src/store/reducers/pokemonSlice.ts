import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialRootState } from './types';
import { RootState } from 'store';
import axios from 'axios';

const initialState: initialRootState = {
  pokemonsData: null,
  loading: false,
  error: undefined,
  currentPage: 1,
  singlePokemon: null,
  speciesUrl: null,

  pokemonInfo: null,
  typesList: null,
  uniqueIdPokemon: null,

  nextURL: '',
  previousURL: '',
  evolutionChain: null,
  total: 0,
};

interface IDataUrl {
  perPage: string;
  fetchURl?: string;
}

export const fetchAllPokemon = createAsyncThunk('pokemon/fetchAll', async (data: IDataUrl, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const currentPage = state.pokemonReducer.currentPage;
    const offset = (currentPage - 1) * +data.perPage;

    const { perPage, fetchURl = `https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${offset}` } = data;

    const response = await axios.get(fetchURl);
    const nextPageURL = response.data.next;
    const previousPageURL = response.data.previous;
    return { response: response.data, next: nextPageURL, prev: previousPageURL };
  } catch (err) {
    console.error('Error', err);
    throw new Error(`Error with Pokemon's  data`);
  }
});
export const fetchSinglePokemonById = createAsyncThunk('pokemon/fetchById', async (id: string | undefined) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  } catch (err) {
    console.error('Error Id', err);
  }
});
export const fetchSpeciesData = createAsyncThunk('pokemon/fetchSpeciesData', async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error('Error Species url not exist', err);
  }
});
const pokemonSlice = createSlice({
  name: 'Pokemon',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchAllPokemon.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchAllPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemonsData = action.payload.response;
        state.nextURL = action.payload?.next;
        state.previousURL = action.payload?.prev;
      })
      .addCase(fetchAllPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSinglePokemonById.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchSinglePokemonById.fulfilled, (state, action) => {
        state.loading = false;
        state.singlePokemon = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchSinglePokemonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchSpeciesData.pending, state => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchSpeciesData.fulfilled, (state, action) => {
        state.loading = false;
        state.speciesUrl = action.payload;
      })
      .addCase(fetchSpeciesData.rejected, (state, actions) => {
        state.loading = false;
        state.error = actions.error.message;
      });
  },
});
export const { changePage } = pokemonSlice.actions;
export default pokemonSlice.reducer;
