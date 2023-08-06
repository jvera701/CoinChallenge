import {ViewStyle, StyleSheet, TextStyle} from 'react-native';
import {scaleSize} from '@core/constants';

interface Styles {
  container: ViewStyle;
  topLoader: ViewStyle;
  endLoader: ViewStyle;
  endText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topLoader: {
    transform: [{scaleX: 2}, {scaleY: 2}],
    marginTop: scaleSize(50),
  },
  endLoader: {
    alignItems: 'center',
  },
  endText: {
    fontSize: scaleSize(20),
    fontWeight: 'bold',
    color: 'black',
  },
});

export default styles;
