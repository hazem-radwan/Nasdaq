// src/screens/ExploreScreen.tsx
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useTickersQuery} from '../hooks/use-stocks';
import StockItem from '../components/stock-item';

const ExploreScreen = () => {
  const [query, setQuery] = useState('');
  const {data, fetchNextPage, isFetchingNextPage, hasNextPage} =
    useTickersQuery({queryParams: {ticker: query}});
  const FlattenedTickersData = useMemo(
    () => data?.pages.flatMap(page => page.results),
    [data],
  );

  useEffect(() => {
    console.log(FlattenedTickersData?.length);
  }, [FlattenedTickersData]);
  const handleSearch = useCallback(
    (text: string) => {
      setQuery(text);
    },
    [setQuery],
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search stocks..."
        value={query}
        onChangeText={handleSearch}
        onFocus={() => {}}
        focusable
      />
      <FlatList
        data={FlattenedTickersData}
        renderItem={({item}) => <StockItem ticker={item} />}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : null
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
