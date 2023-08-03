import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CurrencyRow from '../currency-row';
import {ReactTestInstance} from 'react-test-renderer';
import {scaleSize} from '@core/constants';

describe('Currency row', () => {
  it('Renders correctly', () => {
    const mockFN = jest.fn();
    const {queryByText, queryByTestId} = render(
      <CurrencyRow
        name="name"
        rank={1}
        price={2}
        marketCap={3}
        percentageChange={10}
        onPress={mockFN}
        showTopBorder={false}
      />,
    );
    expect(queryByText('name')).not.toBeNull();
    expect(queryByText('1.')).not.toBeNull();
    expect(queryByText('$2')).not.toBeNull();
    expect(queryByText('$3')).not.toBeNull();
    const percentageText = queryByText('10%');
    expect(percentageText).not.toBeNull();
    expect(percentageText).toHaveStyle({color: 'green'});

    expect(mockFN).toHaveBeenCalledTimes(0);
    const container = queryByTestId('press-container');
    expect(container).not.toBeNull();
    expect(container).not.toHaveStyle({borderTopWidth: scaleSize(1)});
    fireEvent.press(container as ReactTestInstance);
    expect(mockFN).toHaveBeenCalledTimes(1);
  });
  it('Renders red text and top border', () => {
    const {queryByText, queryByTestId} = render(
      <CurrencyRow
        name="name"
        rank={1}
        price={2}
        marketCap={3}
        percentageChange={-10}
        onPress={() => {}}
        showTopBorder={true}
      />,
    );
    const percentageText = queryByText('-10%');
    expect(percentageText).not.toBeNull();
    expect(percentageText).toHaveStyle({color: 'red'});

    const container = queryByTestId('press-container');
    expect(container).not.toBeNull();
    expect(container).toHaveStyle({borderTopWidth: scaleSize(1)});
  });
});
