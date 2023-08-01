import React from 'react';
import {SafeAreaView} from 'react-native';
import {CurrencyRow} from '@components';
import styles from './home.styles';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CurrencyRow
        name="name"
        rank={2}
        price={100}
        marketCap="12222"
        percentageChange={0}
        onPress={() => {}}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
