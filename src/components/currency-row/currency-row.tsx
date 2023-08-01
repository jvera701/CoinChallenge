import React from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './currency-row.styles';

type CurrencyRowProps = {
  name: string;
  rank: number;
  price: number;
  marketCap: string;
  percentageChange: number;
  onPress: () => void;
};

const CurrencyRow = (props: CurrencyRowProps) => {
  const {name, rank, price, marketCap, percentageChange, onPress} = props;

  const getPercentageColor = () => {
    return percentageChange < 0 ? styles.red : styles.green;
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.innerView}>
        <View style={styles.innerRow}>
          <Text style={styles.defaultText}>{`${rank}. `}</Text>
          <Text style={styles.defaultText}>{name}</Text>
        </View>
        <Text style={styles.marketText}>{`$${marketCap}`}</Text>
      </View>
      <View style={styles.innerView}>
        <Text style={styles.defaultText}>{`$${price}`}</Text>
        <Text style={[styles.defaultText, getPercentageColor()]}>
          {`${percentageChange}%`}{' '}
        </Text>
      </View>
    </Pressable>
  );
};

export default CurrencyRow;
