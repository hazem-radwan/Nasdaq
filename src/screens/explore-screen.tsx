// src/screens/ExploreScreen.tsx
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import StockItem from '../components/stock-item';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../store';
import {getRecipesSelector} from '../store/features/recipes/selectors';
import {
  getRecipes,
  searchRecipes,
} from '../store/features/recipes/recipesReducer';
import {debounce} from '../utils/debounce';

const ExploreScreen = () => {
  const [query, setQuery] = useState('');
  const {isLoading, recipes, searchResults, limit} =
    useSelector(getRecipesSelector) ?? {};

  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchQuery = useCallback(
    debounce((q: string) => {
      q && dispatch(searchRecipes({query: q}));
    }, 500),
    [],
  );

  useEffect(() => {
    updateSearchQuery(query);
  }, [query, updateSearchQuery]);

  useEffect(() => {
    dispatch(getRecipes({limit: 20, skip}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetch = () => {
    if (limit !== 0) {
      dispatch(getRecipes({limit: 20, skip: skip + limit}));
      setSkip(val => val + limit);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search stocks..."
        value={query}
        onChangeText={text => setQuery(text)}
        focusable
      />
      <FlatList
        data={query ? searchResults : recipes}
        keyExtractor={item => `${item.id}${item.name}`}
        renderItem={({item}) => <StockItem ticker={item} />}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        onEndReached={refetch}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : null
        }
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between', // Spread items evenly across the row
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    fontSize: 16,
    height: 50,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 5,
    marginHorizontal: 10,
  },
});

export default ExploreScreen;
