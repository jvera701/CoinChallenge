import {scaleSize} from '@core/constants';
import {ViewStyle, StyleSheet, TextStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
  boldedText: TextStyle;
  regularText: TextStyle;
  headerTitle: TextStyle;
  textAlign: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  boldedText: {
    fontSize: scaleSize(18),
    fontWeight: 'bold',
    color: 'black',
  },
  regularText: {
    fontSize: scaleSize(16),
    fontWeight: 'normal',
    color: 'black',
  },
  headerTitle: {
    fontSize: scaleSize(22),
    fontWeight: 'bold',
    color: 'black',
    marginVertical: scaleSize(10),
  },
  textAlign: {
    alignSelf: 'center',
  },
});
export default styles;
