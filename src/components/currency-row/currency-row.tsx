import React, {memo} from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import styles from './currency-row.styles';
import {approximate, getTextColor} from '@core/constants';

export type CurrencyRowProps = {
  name: string;
  price: string;
  marketCap: number;
  percentageChange: string;
  onPress: () => void;
  showTopBorder: boolean;
  imageUrl: string;
  key?: number;
};

const CurrencyRow = (props: CurrencyRowProps) => {
  const {
    name,
    price,
    marketCap,
    percentageChange,
    onPress,
    showTopBorder,
    imageUrl,
    key = 1,
  } = props;

  return (
    <Pressable
      style={[styles.container, showTopBorder && styles.addTopBorder]}
      onPress={onPress}
      key={key}
      testID="press-container">
      <Image
        source={{
          uri: `${imageUrl}`,
        }}
        style={styles.image}
      />
      <View style={[styles.innerView, styles.middleView]}>
        <Text style={styles.defaultText} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={styles.marketText}>{`$${approximate(marketCap)}`}</Text>
      </View>
      <View style={styles.innerView}>
        <Text style={styles.defaultText}>{`$${price}`}</Text>
        <Text style={[styles.percentageText, getTextColor(percentageChange)]}>
          {`${percentageChange}%`}
        </Text>
      </View>
    </Pressable>
  );
};

export default memo(CurrencyRow);
