import {scaleSize} from '@core/constants';
import {ViewStyle, StyleSheet, TextStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
  rowContainer: ViewStyle;
  boldSubtitle: TextStyle;
  socialNumbers: TextStyle;
  price: TextStyle;
  topContainer: ViewStyle;
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
  socialNumbers: {
    fontSize: scaleSize(16),
    fontWeight: 'normal',
    color: 'black',
  },
  price: {
    fontSize: scaleSize(26),
    fontWeight: 'bold',
    color: 'black',
  },
  topContainer: {
    alignItems: 'center',
  },
});

export default styles;
