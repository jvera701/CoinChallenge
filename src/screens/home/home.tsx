import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  View,
  ListRenderItem,
} from 'react-native';
import {CurrencyRow, HeaderData, SearchInput} from '@components';
import {getAllCoins, getGlobalData} from '@api/api';
import styles from './home.styles';
import {useAppDispatch} from '@store/hooks';
import {updateStore} from '@store/initialSlice';
import {getUrl, CURRENCY_ROW_HEIGHT} from '@core/constants';
import Fuse from 'fuse.js';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {CurrencyRowProps, DataHeaderProps} from '@components';
import type {RootStackParamList} from '@navigation';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

type ItemData = {
  index: number;
  item: CurrencyRowProps;
};

const HomeScreen = (props: HomeScreenProps) => {
  const {navigation} = props;
  const [coinData, setCoinData] = React.useState<CurrencyRowProps[]>([]);
  const [startingData, setStartingData] = React.useState<CurrencyRowProps[]>(
    [],
  );
  const [firstRender, setFirstRender] = React.useState(true);
  const [globalData, setGlobalData] = React.useState<
    DataHeaderProps | undefined
  >();
  const [start, setStart] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const dispatch = useAppDispatch();
  const MAX_COINS_PER_PAGE = 50;

  const getCoinData = async () => {
    const answer = await getAllCoins(start, MAX_COINS_PER_PAGE);
    if (!('error' in answer)) {
      const newAns = answer.data.map((coin, index) => {
        const onPressFunc = () => {
          dispatch(
            updateStore({
              price_usd: coin.price_usd,
              percent_change_7d: coin.percent_change_7d,
              percent_change_24h: coin.percent_change_24h,
              percent_change_1h: coin.percent_change_1h,
              symbol: coin.symbol.toLowerCase(),
            }),
          );
          navigation.navigate('Coin Screen', {name: coin.name, id: coin.id});
        };
        return {
          name: coin.name,
          price: coin.price_usd,
          marketCap: parseFloat(coin.market_cap_usd),
          percentageChange: coin.percent_change_24h,
          onPress: onPressFunc,
          showTopBorder: index + coinData.length === 0,
          imageUrl: getUrl(coin.symbol.toLowerCase()),
          key: index + coinData.length,
        };
      });
      // concat is faster than spread
      setCoinData(prevCoin => prevCoin.concat(newAns));
      if (firstRender) {
        setStartingData(newAns);
        setFirstRender(false);
      }
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

  React.useEffect(
    () => {
      fuzzySearch();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search],
  );

  const renderItem: ListRenderItem<CurrencyRowProps> = React.useCallback(
    (oneItem: ItemData) => {
      const {item} = oneItem;
      return <CurrencyRow {...item} />;
    },
    [],
  );

  const fetchMore = () => {
    if (
      globalData !== undefined &&
      coinData.length > 0 &&
      coinData.length < globalData?.coins &&
      search === ''
    ) {
      setLoading(true);
      setStart(start + MAX_COINS_PER_PAGE);
      setLoading(false);
    }
  };

  // Doing fuzzy search with Fuse library
  const fuzzySearch = () => {
    if (search === '' && !firstRender) {
      setCoinData(startingData);
      return;
    }
    const fuse = new Fuse(coinData, {
      keys: ['name'],
    });
    const result = fuse.search(search);
    const finalResult: CurrencyRowProps[] = [];
    if (result.length) {
      setCoinData(result.map(item => item.item));
    } else {
      setCoinData(finalResult);
    }
  };

  const getHeader = () => {
    return globalData !== undefined ? (
      <View>
        <HeaderData {...globalData} />
        <SearchInput
          placeholder="Search Here"
          value={search}
          onChangeText={newText => setSearch(newText)}
          defaultValue=""
          onClear={() => {
            setSearch('');
          }}
        />
      </View>
    ) : (
      <ActivityIndicator size="large" style={styles.topLoader} />
    );
  };

  const getItemLayout = (
    data: ArrayLike<CurrencyRowProps> | null | undefined,
    index: number,
  ) => {
    return {
      length: CURRENCY_ROW_HEIGHT,
      offset: CURRENCY_ROW_HEIGHT * index,
      index,
    };
  };
  const keyExtractor = (item: CurrencyRowProps, index: number) =>
    `post-${index}`;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={coinData}
        renderItem={renderItem}
        onEndReached={fetchMore}
        refreshing={loading}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={getHeader()}
        getItemLayout={getItemLayout}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
