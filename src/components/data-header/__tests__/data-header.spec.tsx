import React from 'react';
import {render} from '@testing-library/react-native';
import DataHeader from '../data-header';

describe('Data Header', () => {
  it('Renders correctly', () => {
    const {queryByText} = render(
      <DataHeader
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
      'Coins List',
      'Markets',
      'Market Cap',
      'BTC.D',
      '24h Vol',
      'ETH.D',
    ];

    for (const expectedString of expectedArray) {
      expect(queryByText(expectedString)).not.toBeNull();
    }
  });
});
