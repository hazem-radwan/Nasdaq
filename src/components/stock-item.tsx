// src/components/StockItem.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const StockItem = ({ticker}: {ticker: {name: string}}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.ticker}>{ticker.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: 120,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginHorizontal: 5,
    flex: 1,
  },
  ticker: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  name: {
    fontSize: 14,
    color: '#555555',
  },
});

export default StockItem;
