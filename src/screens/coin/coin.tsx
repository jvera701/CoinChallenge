import React from 'react';
import {useSelector} from 'react-redux';
import {ActivityIndicator, SafeAreaView, FlatList} from 'react-native';
import styles from './coin.styles';
import {getSocialData, getExchanges} from '@api/api';
import {
  CoinHeader,
  SocialStringOptions,
  SocialFooter,
  ErrorAlert,
  ExchangeRow,
} from '@components';
import {getUrl} from '@core/constants';

import type {SocialType, ExchangeRowProps} from '@components';
import type {RootState} from '@store/store';
import type {RootStackParamList} from '@navigation';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type CoinScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Coin Screen'
>;

type ItemData = {
  index: number;
  item: ExchangeRowProps;
};

/**
 * Coin Screen showed when item is pressed
 * @param props As explained on RootStackParamList, the screen receives the name and the id.
 * @returns
 */
const CoinScreen = (props: CoinScreenProps) => {
  const {route} = props;
  const {id} = route.params;
  const storedData = useSelector((state: RootState) => state.info);
  const [socialData, setSocialData] = React.useState<SocialType>({
    reddit: {
      users: SocialStringOptions.Empty,
      subscribers: SocialStringOptions.Empty,
    },
    twitter: {
      followers: SocialStringOptions.Empty,
      statusCount: SocialStringOptions.Empty,
    },
  });
  const [exchangeData, setExchangeData] = React.useState<ExchangeRowProps[]>(
    [],
  );
  const [error, setError] = React.useState(false);

  const fetchSocials = async () => {
    setError(false);
    const result = await getSocialData(id);

    if (result === '') {
      const answer = {
        reddit: {
          users: SocialStringOptions.NotFound,
          subscribers: SocialStringOptions.NotFound,
        },
        twitter: {
          followers: SocialStringOptions.NotFound,
          statusCount: SocialStringOptions.NotFound,
        },
      };
      setSocialData(answer);
    } else if (!('error' in result)) {
      const {reddit, twitter} = result;
      const answer = {
        reddit: {
          users: reddit?.avg_active_users || SocialStringOptions.NotFound,
          subscribers: reddit?.subscribers || SocialStringOptions.NotFound,
        },
        twitter: {
          followers: twitter?.followers_count || SocialStringOptions.NotFound,
          statusCount: twitter?.status_count || SocialStringOptions.NotFound,
        },
      };
      setSocialData(answer);
    } else {
      setError(true);
    }
  };

  const fetchCoin = async () => {
    const result = await getExchanges(id);
    if (!('error' in result)) {
      const answerArray = result.map((data, index) => {
        const hasANull =
          data.name === null ||
          data.base === null ||
          data.quote === null ||
          data.price === null ||
          data.volume_usd === null;
        return {
          name: data.name || '',
          base: data.base || '',
          quote: data.quote || '',
          price: data.price || 0,
          volumeUsd: data.volume_usd || 0,
          showNull: hasANull,
          showTopBorder: index === 0,
        };
      });
      setExchangeData(answerArray);
    } else {
      setError(false);
    }
  };

  const renderItem = React.useCallback((oneItem: ItemData) => {
    const {item} = oneItem;
    return <ExchangeRow {...item} />;
  }, []);

  React.useEffect(
    () => {
      fetchSocials();
      fetchCoin();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const {reddit, twitter} = socialData;

  const getBody = () => {
    if (error) {
      return <ErrorAlert />;
    }
    return (
      <React.Fragment>
        <FlatList
          ListHeaderComponent={
            <CoinHeader
              imageUrl={getUrl(storedData.symbol)}
              priceUsd={storedData.price_usd}
              change1h={storedData.percent_change_1h}
              change24h={storedData.percent_change_24h}
              change7d={storedData.percent_change_7d}
            />
          }
          ListFooterComponent={
            exchangeData.length > 0 ? (
              <SocialFooter
                redditSubs={reddit.subscribers}
                redditUsers={reddit.users}
                twitterFollow={twitter.followers}
                twitterStatus={twitter.statusCount}
              />
            ) : (
              <React.Fragment />
            )
          }
          data={exchangeData}
          renderItem={renderItem}
          ListEmptyComponent={
            <ActivityIndicator size="large" style={styles.topLoader} />
          }
        />
      </React.Fragment>
    );
  };

  return <SafeAreaView style={styles.container}>{getBody()}</SafeAreaView>;
};

export default CoinScreen;
