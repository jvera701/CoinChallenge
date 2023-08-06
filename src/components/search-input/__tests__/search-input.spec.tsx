import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import SearchInput from '../search-input';
import {ReactTestInstance} from 'react-test-renderer';

describe('Search Input', () => {
  it('Renders correctly', () => {
    const mockFN = jest.fn();
    const {queryByText} = render(<SearchInput onClear={mockFN} />);

    const crossButton = queryByText('X');
    expect(crossButton).not.toBeNull();

    fireEvent.press(crossButton as ReactTestInstance);
    expect(mockFN).toHaveBeenCalledTimes(1);
  });
});
