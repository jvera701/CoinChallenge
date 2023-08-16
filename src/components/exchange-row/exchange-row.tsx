import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styles from './exchange-row.styles';
import {approximate} from '@core/constants';

export type ExchangeRowProps = {
  name: string;
  base: string;
  quote: string;
  price: number;
  volumeUsd: number;
  showNull: boolean;
  showTopBorder?: boolean;
};

const ExchangeRow = (props: ExchangeRowProps) => {
  const {
    name,
    base,
    quote,
    price,
    volumeUsd,
    showNull,
    showTopBorder = false,
  } = props;
  const converted = Number(price.toPrecision(5));
  return (
    <View style={[styles.container, showTopBorder && styles.addTopBorder]}>
      {showNull ? (
        <Text>{'Not found'}</Text>
      ) : (
        <React.Fragment>
          <Text
            style={[styles.bolded, styles.name]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {name}
          </Text>

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.detailWidth}>
            {'1 ' + base + ' to ' + converted + ' ' + quote}
          </Text>

          <View style={styles.innerView}>
            <Text style={styles.bolded}>{'Volume: '}</Text>
            <Text style={styles.volume} numberOfLines={1} ellipsizeMode="tail">
              {volumeUsd > 1000000
                ? approximate(volumeUsd)
                : Number(volumeUsd.toPrecision(5))}
            </Text>
          </View>
        </React.Fragment>
      )}
    </View>
  );
};

export default memo(ExchangeRow);
