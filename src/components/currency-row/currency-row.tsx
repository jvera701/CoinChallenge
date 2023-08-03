import React, {memo} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './currency-row.styles';
import {approximate} from '@core/constants';

export type CurrencyRowProps = {
  name: string;
  rank: number;
  price: number;
  marketCap: number;
  percentageChange: number;
  onPress: () => void;
  showTopBorder: boolean;
};

const CurrencyRow = (props: CurrencyRowProps) => {
  const {
    name,
    rank,
    price,
    marketCap,
    percentageChange,
    onPress,
    showTopBorder,
  } = props;

  const getPercentageColor = () => {
    return percentageChange < 0 ? styles.red : styles.green;
  };

  return (
    <Pressable
      style={[styles.container, showTopBorder && styles.addTopBorder]}
      onPress={onPress}
      testID="press-container">
      <View style={styles.innerView}>
        <View style={styles.innerRow}>
          <Text style={styles.defaultText}>{`${rank}. `}</Text>
          <Text style={styles.defaultText}>{name}</Text>
        </View>
        <Text style={styles.marketText}>{`$${approximate(marketCap)}`}</Text>
      </View>
      <View style={styles.innerView}>
        <View style={styles.textAlign}>
          <Text style={styles.defaultText}>{`$${price}`}</Text>
        </View>
        <View style={styles.textAlign}>
          <Text style={[styles.percentageText, getPercentageColor()]}>
            {`${percentageChange}%`}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(CurrencyRow);
