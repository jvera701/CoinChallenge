import React from 'react';
import type {RootState} from '@store/store';
import {useSelector} from 'react-redux';
import {Text, SafeAreaView} from 'react-native';
import styles from './coin.styles';
import {getSocialData} from '@api/api';

type CoinScreenProps = {
  navigation: any;
  route: any;
};

enum options {
  NotFound = 'Not found',
  Empty = '',
}

type Special = number | options;

type SocialType = {
  reddit: {
    users: Special;
    subscribers: Special;
  };
  twitter: {
    followers: Special;
    statusCount: Special;
  };
};

type MarketType = {};

const CoinScreen = (props: CoinScreenProps) => {
  const {route} = props;
  const {id} = route.params;
  const lol = useSelector((state: RootState) => state.info);
  const [socialData, setSocialData] = React.useState<SocialType>({
    reddit: {
      users: options.Empty,
      subscribers: options.Empty,
    },
    twitter: {
      followers: options.Empty,
      statusCount: options.Empty,
    },
  });
  const [marketData, setMarketData] = React.useState([]);

  const fetchSocials = async () => {
    const result = await getSocialData(id);

    if (!('error' in result)) {
      const {reddit, twitter} = result;
      const answer = {
        reddit: {
          users: reddit?.avg_active_users || options.NotFound,
          subscribers: reddit?.subscribers || options.NotFound,
        },
        twitter: {
          followers: twitter?.followers_count || options.NotFound,
          statusCount: twitter?.status_count || options.NotFound,
        },
      };
      setSocialData(answer);
    } else {
      console.error(result);
    }
  };

  React.useEffect(
    () => {
      fetchSocials();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>{lol.price_usd}</Text>
      <Text>{lol.percent_change_7d}</Text>
      <Text>{lol.percent_change_24h}</Text>
      <Text>{lol.percent_change_1h}</Text>

      <Text>{socialData.reddit.users}</Text>
      <Text>{socialData.reddit.subscribers}</Text>
      <Text>{socialData.twitter.followers}</Text>
      <Text>{socialData.twitter.statusCount}</Text>
    </SafeAreaView>
  );
};

export default CoinScreen;
