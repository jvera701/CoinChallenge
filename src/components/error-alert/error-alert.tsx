import React from 'react';
import {View, Text} from 'react-native';
import styles from './error-alert.styles';

const ErrorAlert = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
        {'An error has occurred, please try later'}
      </Text>
    </View>
  );
};

export default ErrorAlert;
