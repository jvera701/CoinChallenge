import {scaleSize} from '@core/constants';
import {ViewStyle, StyleSheet, TextStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
  rowContainer: ViewStyle;
  boldSubtitle: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: scaleSize(10),
    marginTop: scaleSize(10),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boldSubtitle: {
    fontSize: scaleSize(16),
    fontWeight: 'bold',
    color: 'black',
  },
});

export default styles;