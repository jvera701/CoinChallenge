import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {CurrencyRow} from '@components';
import {getAllCoins} from '@api/api';
import styles from './home.styles';
import type {CurrencyRowProps} from '@components';

type itemData = {
  index: number;
  item: CurrencyRowProps;
};

const HomeScreen = () => {
  const [coinData, setCoinData] = React.useState<CurrencyRowProps[]>([]);

  const getSampleData = async () => {
    const answer = await getAllCoins(0, 10);
    if (!('error' in answer)) {
      const newAns = answer.data.map(coin => {
        return {
          name: coin.name,
          rank: coin.rank,
          price: parseFloat(coin.price_usd),
          marketCap: coin.market_cap_usd,
          percentageChange: parseFloat(coin.percent_change_24h),
          onPress: () => {},
        };
      });
      setCoinData(newAns);
    }
  };

  React.useEffect(() => {
    getSampleData();
  }, []);

  const renderItem = (oneItem: itemData) => {
    const {item} = oneItem;
    return <CurrencyRow {...item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={coinData} renderItem={renderItem} />
    </SafeAreaView>
  );
};

export default HomeScreen;
