// src/components/StockItem.tsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Ticker} from '../hooks/use-stocks';

const StockItem = ({ticker}: {ticker: Ticker}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.ticker}>{ticker.ticker}</Text>
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
    borderColor: '#EEEEEE',
    borderRadius: 5,
    marginHorizontal: 5,
    flex: 1,
  },
  ticker: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  name: {
    fontSize: 14,
    color: '#555555',
  },
});

export default StockItem;
