import React from 'react';
import {render} from '@testing-library/react-native';
import ExchangeRow from '../exchange-row';

describe('Exchange row', () => {
  it('Renders correctly', () => {
    const {queryByText} = render(
      <ExchangeRow
        name="n"
        base="b"
        quote="q"
        price={10}
        volumeUsd={2}
        showNull={false}
      />,
    );

    const expectedArray = ['n', '1 b to 10 q', '2'];

    for (const expectedString of expectedArray) {
      expect(queryByText(expectedString)).not.toBeNull();
    }
    expect(queryByText('Not found')).toBeNull();
  });
  it('Renders null', () => {
    const {queryByText} = render(
      <ExchangeRow
        name="n"
        base="b"
        quote="q"
        price={10}
        volumeUsd={2}
        showNull={true}
      />,
    );
    expect(queryByText('Not found')).not.toBeNull();
  });
});
