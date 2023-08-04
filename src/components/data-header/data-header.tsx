import React from 'react';
import {View, Text} from 'react-native';
import styles from './data-header.styles';
import {approximate} from '@core/constants';

export type DataHeaderProps = {
  coins: number;
  marketCap: number;
  totalVolume: number;
  markets: number;
  btcD: string;
  ethD: string;
};

const DataHeader = (props: DataHeaderProps) => {
  const {coins, marketCap, totalVolume, markets, btcD, ethD} = props;
  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.boldedText}>{'Coins'}</Text>
          <Text style={styles.regularText}>{coins}</Text>
          <Text style={styles.boldedText}>{'Markets'}</Text>
          <Text style={styles.regularText}>{markets}</Text>
        </View>
        <View>
          <Text style={styles.boldedText}>{'Market Cap'}</Text>
          <Text style={styles.regularText}>{approximate(marketCap)}</Text>
          <Text style={styles.boldedText}>{'BTC.D'}</Text>
          <Text style={styles.regularText}>{btcD}</Text>
        </View>
        <View>
          <Text style={styles.boldedText}>{'24h Vol'}</Text>
          <Text style={styles.regularText}>{approximate(totalVolume)}</Text>
          <Text style={styles.boldedText}>{'ETH.D'}</Text>
          <Text style={styles.regularText}>{ethD}</Text>
        </View>
      </View>
      <View style={styles.textAlign}>
        <Text style={styles.headerTitle}>{'Coins List'}</Text>
      </View>
    </View>
  );
};
export default DataHeader;
