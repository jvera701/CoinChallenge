import React from 'react';
import type {RootState} from '@store/store';
import {useSelector} from 'react-redux';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import styles from './coin.styles';
import {getSocialData} from '@api/api';
import {CoinHeader, StringOptions, SocialFooter} from '@components';
import type {SocialType} from '@components';

type CoinScreenProps = {
  navigation: any;
  route: any;
};

const CoinScreen = (props: CoinScreenProps) => {
  const {route} = props;
  const {id} = route.params;
  const info = useSelector((state: RootState) => state.info);
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

    if (!('error' in result)) {
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
        <>
          <CoinHeader
            priceUsd={info.price_usd}
            change1h={parseFloat(info.percent_change_1h)}
            change24h={parseFloat(info.percent_change_24h)}
            change7d={parseFloat(info.percent_change_7d)}
          />
          <SocialFooter
            redditSubs={reddit.subscribers}
            redditUsers={reddit.users}
            twitterFollow={twitter.followers}
            twitterStatus={twitter.statusCount}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default CoinScreen;
