import {scaleSize} from '@core/constants';
import {ViewStyle, StyleSheet, TextStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: scaleSize(40),
    backgroundColor: 'red',
  },
  text: {
    fontSize: scaleSize(18),
    color: 'black',
    fontWeight: 'bold',
  },
});
export default styles;
