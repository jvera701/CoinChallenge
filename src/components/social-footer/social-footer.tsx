import React from 'react';
import {View, Text} from 'react-native';
import {approximate} from '@core/constants';
import styles from './social-footer.styles';

export enum StringOptions {
  NotFound = 'Not found',
  Empty = '',
}

type Socials = number | StringOptions;

export type SocialType = {
  reddit: {
    users: Socials;
    subscribers: Socials;
  };
  twitter: {
    followers: Socials;
    statusCount: Socials;
  };
};

type SocialFooterProps = {
  redditUsers: Socials;
  redditSubs: Socials;
  twitterFollow: Socials;
  twitterStatus: Socials;
};

const SocialFooter = (props: SocialFooterProps) => {
  const {redditUsers, redditSubs, twitterFollow, twitterStatus} = props;
  const nearestInteger = (arg: Socials) => {
    if ((arg as StringOptions).length !== undefined) {
      return arg;
    } else {
      return approximate(arg as number);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.boldSubtitle}>{'Reddit subs'}</Text>
          <Text>{nearestInteger(redditSubs)}</Text>
        </View>
        <View>
          <Text style={styles.boldSubtitle}>{'Reddit users'}</Text>
          <Text>{nearestInteger(redditUsers)}</Text>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.boldSubtitle}>{'Twitter followers'}</Text>
          <Text>{nearestInteger(twitterFollow)}</Text>
        </View>
        <View>
          <Text style={styles.boldSubtitle}>{'Twitter status'}</Text>
          <Text>{nearestInteger(twitterStatus)}</Text>
        </View>
      </View>
    </View>
  );
};

export default SocialFooter;
