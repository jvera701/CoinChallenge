import React from 'react';
import CoinHeader from '../coin-header';
import {render} from '@testing-library/react-native';

describe('Coin Header', () => {
  it('Renders correctly', () => {
    const {queryByText} = render(
      <CoinHeader
        imageUrl="s"
        priceUsd="1"
        change1h="2"
        change24h="3"
        change7d="4"
      />,
    );

    const expectedArray = ['$1', '2%', '3%', '4%'];

    for (const expectedString of expectedArray) {
      expect(queryByText(expectedString)).not.toBeNull();
    }
  });
});
