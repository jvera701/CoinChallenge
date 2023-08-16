import {scaleSize} from '@core/constants';
import {ViewStyle, StyleSheet, TextStyle} from 'react-native';

interface Styles {
  container: ViewStyle;
  bolded: TextStyle;
  name: TextStyle;
  innerView: ViewStyle;
  detailWidth: TextStyle;
  volume: TextStyle;
  addTopBorder: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: scaleSize(50),
    backgroundColor: 'white',
    paddingHorizontal: scaleSize(10),
    paddingVertical: scaleSize(5),
    borderRadius: scaleSize(3),
    borderColor: 'gray',
    borderBottomWidth: scaleSize(1),
  },
  bolded: {
    fontSize: scaleSize(16),
    fontWeight: 'bold',
    color: 'black',
  },
  name: {
    width: scaleSize(90),
  },
  innerView: {
    marginLeft: scaleSize(5),
    width: scaleSize(70),
  },
  detailWidth: {
    fontSize: scaleSize(14),
    color: 'black',
    width: scaleSize(190),
    marginLeft: scaleSize(5),
  },
  volume: {
    fontSize: scaleSize(14),
    color: 'black',
  },
  addTopBorder: {
    borderTopWidth: scaleSize(1),
  },
});

export default styles;
