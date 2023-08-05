import React from 'react';
import {useSelector} from 'react-redux';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import styles from './coin.styles';
import {getSocialData} from '@api/api';
import {CoinHeader, StringOptions, SocialFooter} from '@components';
import {getUrl} from '@core/constants';

import type {SocialType} from '@components';
import type {RootState} from '@store/store';

type CoinScreenProps = {
  navigation: any;
  route: any;
};

const CoinScreen = (props: CoinScreenProps) => {
  const {route} = props;
  const {id} = route.params;
  const storedData = useSelector((state: RootState) => state.info);
  const [socialData, setSocialData] = React.useState<SocialType>({
    reddit: {
      users: StringOptions.Empty,
      subscribers: StringOptions.Empty,
    },
    twitter: {
      followers: StringOptions.Empty,
      statusCount: StringOptions.Empty,
    },
  });
  //const [marketData, setMarketData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const fetchSocials = async () => {
    setLoading(true);
    const result = await getSocialData(id);

    if (result === '') {
      const answer = {
        reddit: {
          users: StringOptions.NotFound,
          subscribers: StringOptions.NotFound,
        },
        twitter: {
          followers: StringOptions.NotFound,
          statusCount: StringOptions.NotFound,
        },
      };
      setSocialData(answer);
    } else if (!('error' in result)) {
      const {reddit, twitter} = result;
      const answer = {
        reddit: {
          users: reddit?.avg_active_users || StringOptions.NotFound,
          subscribers: reddit?.subscribers || StringOptions.NotFound,
        },
        twitter: {
          followers: twitter?.followers_count || StringOptions.NotFound,
          statusCount: twitter?.status_count || StringOptions.NotFound,
        },
      };
      setSocialData(answer);
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

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" style={styles.topLoader} />
      ) : (
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
      )}
    </SafeAreaView>
  );
};

export default CoinScreen;
