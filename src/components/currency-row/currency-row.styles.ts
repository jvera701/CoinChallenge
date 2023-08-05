import {scaleSize, CURRENCY_ROW_HEIGHT} from '@core/constants';
import {ViewStyle, StyleSheet, TextStyle, ImageStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
  addTopBorder: ViewStyle;
  innerRow: ViewStyle;
  defaultText: TextStyle;
  innerView: ViewStyle;
  marketText: TextStyle;
  percentageText: TextStyle;
  textAlign: TextStyle;
  image: ImageStyle;
  middleView: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: CURRENCY_ROW_HEIGHT,
    backgroundColor: 'white',
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(5),
    borderRadius: scaleSize(3),
    borderColor: 'gray',
    borderBottomWidth: scaleSize(1),
  },
  addTopBorder: {
    borderTopWidth: scaleSize(1),
  },
  innerRow: {
    flexDirection: 'row',
  },
  defaultText: {
    fontSize: scaleSize(20),
    color: 'black',
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
  textAlign: {
    alignSelf: 'flex-end',
  },
  image: {
    width: scaleSize(30),
    height: scaleSize(30),
    resizeMode: 'contain',
  },
  middleView: {
    paddingLeft: scaleSize(10),
    width: scaleSize(220),
  },
});
export default styles;
