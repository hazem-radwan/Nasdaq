import {configureStore} from '@reduxjs/toolkit';
import {recipesReducer} from './features/recipes/recipesReducer';
import {useDispatch} from 'react-redux';
export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
