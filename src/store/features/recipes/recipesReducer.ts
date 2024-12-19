import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getRecipesAPI, searchRecipesAPI} from '../../../api/tickers-api';
import {RecipesState} from '../../types';

export const initialState: RecipesState = {
  recipes: [],
  searchResults: [],
  isLoading: false,
  error: undefined,
  isError: false,
  total: 0,
  limit: 20,
  skip: 0,
};

export const getRecipes = createAsyncThunk(
  'recipes/fetchAll',
  async ({limit, skip}: {limit: number; skip: number}) => {
    return await getRecipesAPI(limit, skip);
  },
);
export const searchRecipes = createAsyncThunk(
  'recipes/search',
  async ({query}: {query: string}) => {
    return await searchRecipesAPI(query);
  },
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    clearRecipes() {
      return {
        searchResults: [],
        recipes: [],
        isError: false,
        isLoading: false,
        error: undefined,
        total: 0,
        skip: 0,
        limit: 20,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRecipes.fulfilled, (state, {payload}) => {
        return {
          ...state,
          ...(payload?.data ?? {}),
          recipes: [...state.recipes, ...(payload?.data?.recipes || [])],
          isLoading: false,
        };
      })
      .addCase(getRecipes.pending, state => {
        return {...state, isLoading: true};
      });

    builder
      .addCase(searchRecipes.fulfilled, (state, {payload}) => {
        return {
          ...state,
          searchResults: [...(payload?.data?.recipes || [])],
          isLoading: false,
          total: payload?.data?.total ?? 0,
        };
      })
      .addCase(searchRecipes.pending, state => {
        return {...state, isLoading: true};
      });
  },
});

export const recipesReducer = recipesSlice.reducer;
export const {clearRecipes} = recipesSlice.actions;
