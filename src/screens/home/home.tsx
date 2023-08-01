import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {CurrencyRow} from '@components';
import {getAllCoins, getGlobalData} from '@api/api';
import styles from './home.styles';
import type {CurrencyRowProps} from '@components';

type itemData = {
  index: number;
  item: CurrencyRowProps;
};

const HomeScreen = () => {
  const [coinData, setCoinData] = React.useState<CurrencyRowProps[]>([]);
  const [start, setStart] = React.useState(0);
  const [limit, setLimit] = React.useState(50);
  const MAX_COINS_PER_PAGE = 20;

  const getSampleData = async () => {
    const answer = await getAllCoins(start, MAX_COINS_PER_PAGE);
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
      // concat is faster than spread
      setCoinData(coinData.concat(newAns));
    }
  };

  const getGlobal = async () => {
    const answer = await getGlobalData();
    if (!('error' in answer)) {
      const first = answer[0];
      setLimit(first.coins_count);
    }
  };

  React.useEffect(() => {
    getGlobal();
  }, []);

  React.useEffect(
    () => {
      getSampleData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [start],
  );

  const renderItem = (oneItem: itemData) => {
    const {item} = oneItem;
    return <CurrencyRow {...item} />;
  };

  const fetchMore = () => {
    if (coinData.length < limit) {
      setStart(start + MAX_COINS_PER_PAGE);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={coinData}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={fetchMore}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
