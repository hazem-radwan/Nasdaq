import {AxiosError} from 'axios';

export interface IAppState {
  recipes: RecipesState;
}

export type RecipesState = {
  recipes: any[];
  searchResults: any[];
  isLoading: boolean;
  error: AxiosError | undefined;
  isError: boolean;
  total: number;
  limit: number;
  skip: number;
};
