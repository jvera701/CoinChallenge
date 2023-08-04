import {ViewStyle, StyleSheet, TextStyle} from 'react-native';
import {scaleSize} from '@core/constants';

interface Styles {
  container: ViewStyle;
  textInput: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: scaleSize(10),
    marginBottom: scaleSize(10),
    justifyContent: 'space-around',
  },
  textInput: {
    width: scaleSize(200),
    color: 'black',
    fontSize: scaleSize(16),
  },
});

export default styles;
