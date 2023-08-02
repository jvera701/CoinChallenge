import {ViewStyle, StyleSheet} from 'react-native';
import {scaleSize} from '@core/constants';

interface Styles {
  container: ViewStyle;
  topLoader: ViewStyle;
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
});

export default styles;
