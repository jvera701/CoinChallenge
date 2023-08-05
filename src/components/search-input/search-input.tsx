import React from 'react';
import {View, Text, TextInputProps, TextInput, Pressable} from 'react-native';
import styles from './search-input.styles';

interface SearchInputProps extends TextInputProps {
  onClear: () => void;
}

const SearchInput = (props: SearchInputProps) => {
  const {onClear, ...rest} = props;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <TextInput {...rest} style={styles.textInput} />
        <Pressable onPress={onClear}>
          <Text>{'X'}</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default SearchInput;
