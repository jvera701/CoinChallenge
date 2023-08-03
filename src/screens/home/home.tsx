import React from 'react';
import {FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import {CurrencyRow, HeaderData} from '@components';
import {getAllCoins, getGlobalData} from '@api/api';
import styles from './home.styles';
import type {CurrencyRowProps, GlobalDataProps} from '@components';

type itemData = {
  index: number;
  item: CurrencyRowProps;
};

const HomeScreen = () => {
  const [coinData, setCoinData] = React.useState<CurrencyRowProps[]>([]);
  const [globalData, setGlobalData] = React.useState<
    GlobalDataProps | undefined
  >();
  const [start, setStart] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const MAX_COINS_PER_PAGE = 20;

  const getCoinData = async () => {
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
      setCoinData(prevCoin => prevCoin.concat(newAns));
    }
  };

  const getGlobal = async () => {
    const answer = await getGlobalData();
    if (!('error' in answer)) {
      const first = answer[0];
      setGlobalData({
        coins: first.coins_count,
        marketCap: first.total_mcap,
        totalVolume: first.total_volume,
        markets: first.active_markets,
        btcD: first.btc_d,
        ethD: first.eth_d,
      });
    }
  };

  React.useEffect(() => {
    getGlobal();
  }, []);

  React.useEffect(
    () => {
      getCoinData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [start],
  );

  const renderItem = React.useCallback((oneItem: itemData) => {
    const {index, item} = oneItem;
    return <CurrencyRow {...item} showTopBorder={index === 0} />;
  }, []);

  const fetchMore = () => {
    if (globalData !== undefined && coinData.length < globalData?.coins) {
      setLoading(true);
      setStart(start + MAX_COINS_PER_PAGE);
      setLoading(false);
    }
  };

  const getHeader = () => {
    return globalData !== undefined ? (
      <HeaderData {...globalData} />
    ) : (
      <ActivityIndicator size="large" style={styles.topLoader} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={coinData}
        renderItem={renderItem}
        onEndReached={fetchMore}
        refreshing={loading}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={getHeader()}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
