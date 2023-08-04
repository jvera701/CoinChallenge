import React from 'react';
import {render} from '@testing-library/react-native';
import HeaderData from '../data-header';

describe('Header Data', () => {
  it('Renders correctly', () => {
    const {queryByText} = render(
      <HeaderData
        coins={2}
        marketCap={3}
        totalVolume={4}
        markets={5}
        btcD="btc"
        ethD="eth"
      />,
    );
    const expectedArray = [
      '2',
      '3',
      '4',
      '5',
      'btc',
      'eth',
      'Coins',
      'Markets',
      'Market Cap',
      'BTC.D',
      '24h Vol',
      'ETH.D',
    ];

    for (let expectedString of expectedArray) {
      expect(queryByText(expectedString)).not.toBeNull();
    }
  });
});
