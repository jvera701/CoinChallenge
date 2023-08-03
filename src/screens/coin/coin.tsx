import React from 'react';
import type {RootState} from '@store/store';
import {useSelector} from 'react-redux';
import {Text, SafeAreaView} from 'react-native';

const CoinScreen = () => {
  const lol = useSelector((state: RootState) => state.info.id);

  return (
    <SafeAreaView>
      <Text>{lol}</Text>
    </SafeAreaView>
  );
};

export default CoinScreen;
