import React from 'react';
import {render} from '@testing-library/react-native';
import ErrorAlert from '../error-alert';

describe('Error alert', () => {
  it('Renders correctly', () => {
    const {queryByText} = render(<ErrorAlert />);
    expect(
      queryByText('An error has occurred, please try later'),
    ).not.toBeNull();
  });
});
