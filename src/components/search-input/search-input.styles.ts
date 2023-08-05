import {ViewStyle, StyleSheet, TextStyle} from 'react-native';
import {scaleSize} from '@core/constants';

interface Styles {
  container: ViewStyle;
  textInput: TextStyle;
  mainContainer: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: scaleSize(10),
    marginBottom: scaleSize(10),
    paddingVertical: scaleSize(5),
    paddingHorizontal: scaleSize(10),
    justifyContent: 'space-around',
    borderColor: 'black',
    borderWidth: scaleSize(1),
    borderRadius: scaleSize(4),
  },
  textInput: {
    width: scaleSize(250),
    color: 'black',
    fontSize: scaleSize(16),
  },
  mainContainer: {
    alignItems: 'center',
  },
});

export default styles;
