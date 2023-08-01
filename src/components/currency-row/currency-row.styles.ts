import {scaleSize} from '@core/constants';
import {ViewStyle, StyleSheet, TextStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
  innerRow: ViewStyle;
  defaultText: TextStyle;
  red: TextStyle;
  green: TextStyle;
  innerView: ViewStyle;
  marketText: TextStyle;
  percentageText: TextStyle;
  textAllign: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxHeight: scaleSize(65),
    backgroundColor: '#d9d9d9',
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scaleSize(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: scaleSize(3.84),
    elevation: 5,
    borderRadius: scaleSize(3),
  },
  innerRow: {
    flexDirection: 'row',
  },
  defaultText: {
    fontSize: scaleSize(20),
    color: 'black',
  },
  red: {
    color: 'red',
  },
  green: {
    color: 'green',
  },
  innerView: {
    height: '100%',
    justifyContent: 'space-between',
  },
  marketText: {
    fontSize: scaleSize(16),
    color: '#333333',
  },
  percentageText: {
    fontSize: scaleSize(20),
  },
  textAllign: {
    alignSelf: 'flex-end',
  },
});
export default styles;