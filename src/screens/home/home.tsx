import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  View,
  ListRenderItem,
  Text,
} from 'react-native';
import {CurrencyRow, DataHeader, SearchInput, ErrorAlert} from '@components';
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

interface AllCurrencyData extends CurrencyRowProps {
  symbol: string;
}

/**
 * Shows the first screen
 * @param props Home screen default props
 * @returns
 */
const HomeScreen = (props: HomeScreenProps) => {
  const {navigation} = props;
  const [coinData, setCoinData] = React.useState<AllCurrencyData[]>([]);
  const [startingData, setStartingData] = React.useState<AllCurrencyData[]>([]);
  const [firstRender, setFirstRender] = React.useState(true);
  const [globalError, setGlobalError] = React.useState(false);
  const [coinError, setCoinError] = React.useState(false);
  const [globalData, setGlobalData] = React.useState<
    DataHeaderProps | undefined
  >();
  const [start, setStart] = React.useState(0);
  const [loadingCoin, setLoadingCoin] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const dispatch = useAppDispatch();
  const MAX_COINS_PER_PAGE = 40;

  const getLimit = () => {
    if (globalData === undefined) {
      return MAX_COINS_PER_PAGE;
    } else {
      return start + MAX_COINS_PER_PAGE < globalData?.coins
        ? MAX_COINS_PER_PAGE
        : globalData?.coins - start;
    }
  };

  const getCoinData = async () => {
    setCoinError(false);
    const answer = await getAllCoins(start, getLimit());
    if (!('error' in answer)) {
      const newAns = answer.data.map((coin, index) => {
        const symbol = coin.symbol.toLowerCase();
        const onPressFunc = () => {
          dispatch(
            updateStore({
              price_usd: coin.price_usd,
              percent_change_7d: coin.percent_change_7d,
              percent_change_24h: coin.percent_change_24h,
              percent_change_1h: coin.percent_change_1h,
              symbol: symbol,
            }),
          );
          const title = coin.name + ' - ' + coin.symbol;
          navigation.navigate('Coin Screen', {name: title, id: coin.id});
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
          symbol: symbol,
        };
      });
      // concat is faster than spread
      setCoinData(prevCoin => prevCoin.concat(newAns));
      if (firstRender) {
        setStartingData(newAns);
        setFirstRender(false);
      }
    } else {
      setCoinError(true);
    }
  };

  const getGlobal = async () => {
    setGlobalError(false);
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
    } else {
      setGlobalError(true);
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
      setLoadingCoin(true);
      setStart(start + MAX_COINS_PER_PAGE);
      setLoadingCoin(false);
    }
  };

  const getFooter = () => {
    const loadedAndNotSearch =
      !coinError && globalData !== undefined && search === '';
    const showEnd = loadedAndNotSearch && coinData.length >= globalData?.coins;
    const showLoader =
      !firstRender && loadedAndNotSearch && coinData.length < globalData?.coins;

    return (
      <View style={styles.endLoader}>
        {showEnd && <Text style={styles.endText}>{'This is the end'}</Text>}
        {showLoader && (
          <ActivityIndicator size="small" style={styles.topLoader} />
        )}
      </View>
    );
  };

  // Doing fuzzy search with Fuse library
  const fuzzySearch = () => {
    if (search === '' && !firstRender) {
      setCoinData(startingData);
      return;
    }
    const fuse = new Fuse(coinData, {
      keys: ['name', 'symbol'],
    });
    const result = fuse.search(search);
    const finalResult: AllCurrencyData[] = [];

    // no result returns an empty object
    if (result.length) {
      setCoinData(result.map(item => item.item));
    } else {
      setCoinData(finalResult);
    }
  };

  const getHeader = () => {
    if (globalError) {
      return <ErrorAlert />;
    }
    if (globalData !== undefined) {
      return (
        <View>
          <DataHeader {...globalData} />
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
      );
    }
  };

  const getEmpty = () => {
    if (coinError) {
      return <ErrorAlert />;
    } else {
      return <ActivityIndicator size="large" style={styles.topLoader} />;
    }
  };

  const getItemLayout = (
    _data: ArrayLike<CurrencyRowProps> | null | undefined,
    index: number,
  ) => {
    return {
      length: CURRENCY_ROW_HEIGHT,
      offset: CURRENCY_ROW_HEIGHT * index,
      index,
    };
  };
  const keyExtractor = (_item: CurrencyRowProps, index: number) =>
    `post-${index}`;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={coinData}
        renderItem={renderItem}
        onEndReached={fetchMore}
        refreshing={loadingCoin}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={getHeader()}
        ListFooterComponent={getFooter()}
        ListEmptyComponent={getEmpty()}
        getItemLayout={getItemLayout}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
