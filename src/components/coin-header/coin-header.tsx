import React from 'react';
import {View, Text} from 'react-native';
import styles from './coin-header.styles';

type CoinHeaderProps = {
  priceUsd: string;
  change7d: number;
  change24h: number;
  change1h: number;
};

const CoinHeader = (props: CoinHeaderProps) => {
  const {priceUsd, change7d, change24h, change1h} = props;

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.price}>{`$${priceUsd}`}</Text>
      </View>
      <Text style={styles.boldSubtitle}>{'% change'}</Text>
      <View style={styles.rowContainer}>
        <View>
          <Text>{'1h'}</Text>
          <Text>{change1h}</Text>
        </View>
        <View>
          <Text>{'24h'}</Text>
          <Text>{change24h}</Text>
        </View>
        <View>
          <Text>{'7d'}</Text>
          <Text>{change7d}</Text>
        </View>
      </View>
    </View>
  );
};

export default CoinHeader;
