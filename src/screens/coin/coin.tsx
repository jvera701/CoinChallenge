import React from 'react';
import {useSelector} from 'react-redux';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import styles from './coin.styles';
import {getSocialData} from '@api/api';
import {
  CoinHeader,
  SocialStringOptions,
  SocialFooter,
  ErrorAlert,
} from '@components';
import {getUrl} from '@core/constants';

import type {SocialType} from '@components';
import type {RootState} from '@store/store';
import type {RootStackParamList} from '@navigation';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type CoinScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Coin Screen'
>;

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
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const fetchSocials = async () => {
    setError(false);
    setLoading(true);
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
    setLoading(false);
  };

  React.useEffect(
    () => {
      fetchSocials();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const {reddit, twitter} = socialData;

  const getBody = () => {
    if (error) {
      return <ErrorAlert />;
    }
    if (loading) {
      return <ActivityIndicator size="large" style={styles.topLoader} />;
    }
    return (
      <React.Fragment>
        <CoinHeader
          imageUrl={getUrl(storedData.symbol)}
          priceUsd={storedData.price_usd}
          change1h={storedData.percent_change_1h}
          change24h={storedData.percent_change_24h}
          change7d={storedData.percent_change_7d}
        />
        <SocialFooter
          redditSubs={reddit.subscribers}
          redditUsers={reddit.users}
          twitterFollow={twitter.followers}
          twitterStatus={twitter.statusCount}
        />
      </React.Fragment>
    );
  };

  return <SafeAreaView style={styles.container}>{getBody()}</SafeAreaView>;
};

export default CoinScreen;
