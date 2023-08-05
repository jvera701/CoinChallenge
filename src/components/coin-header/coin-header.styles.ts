import {scaleSize} from '@core/constants';
import {ViewStyle, StyleSheet, TextStyle, ImageStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
  rowContainer: ViewStyle;
  boldSubtitle: TextStyle;
  regularNumbers: TextStyle;
  price: TextStyle;
  topContainer: ViewStyle;
  image: ImageStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: scaleSize(10),
    marginTop: scaleSize(10),
    maxHeight: scaleSize(200),
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
  regularNumbers: {
    fontSize: scaleSize(16),
    fontWeight: 'normal',
    color: 'black',
  },
  price: {
    fontSize: scaleSize(26),
    fontWeight: 'bold',
    color: 'black',
    paddingLeft: scaleSize(20),
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scaleSize(20),
  },
  image: {
    width: scaleSize(100),
    height: scaleSize(100),
    resizeMode: 'contain',
  },
});

export default styles;
