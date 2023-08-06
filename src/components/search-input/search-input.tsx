import React from 'react';
import {View, Text, TextInputProps, TextInput, Pressable} from 'react-native';
import styles from './search-input.styles';
import {scaleSize} from '@core/constants';

interface SearchInputProps extends TextInputProps {
  onClear: () => void;
}

const SearchInput = (props: SearchInputProps) => {
  const {onClear, ...rest} = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TextInput {...rest} style={styles.textInput} />
        <Pressable
          style={styles.pressContainer}
          onPress={onClear}
          hitSlop={scaleSize(5)}>
          <Text style={styles.buttonText}>{'X'}</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default SearchInput;
