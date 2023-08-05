import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './coin-header.styles';
import {getTextColor} from '@core/constants';

type CoinHeaderProps = {
  imageUrl: string;
  priceUsd: string;
  change7d: string;
  change24h: string;
  change1h: string;
};

const CoinHeader = (props: CoinHeaderProps) => {
  const {priceUsd, change7d, change24h, change1h, imageUrl} = props;

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={{
            uri: `${imageUrl}`,
          }}
          style={styles.image}
        />
        <Text style={styles.price}>{`$${priceUsd}`}</Text>
      </View>
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.boldSubtitle}>{'1h'}</Text>
          <Text style={[styles.regularNumbers, getTextColor(change1h)]}>
            {`${change1h}%`}
          </Text>
        </View>
        <View>
          <Text style={styles.boldSubtitle}>{'24h'}</Text>
          <Text style={[styles.regularNumbers, getTextColor(change24h)]}>
            {`${change24h}%`}
          </Text>
        </View>
        <View>
          <Text style={styles.boldSubtitle}>{'7d'}</Text>
          <Text style={[styles.regularNumbers, getTextColor(change7d)]}>
            {`${change7d}%`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CoinHeader;
