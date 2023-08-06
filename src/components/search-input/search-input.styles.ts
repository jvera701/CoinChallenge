import {ViewStyle, StyleSheet, TextStyle} from 'react-native';
import {scaleSize} from '@core/constants';

interface Styles {
  container: ViewStyle;
  textInput: TextStyle;
  mainContainer: ViewStyle;
  pressContainer: ViewStyle;
  buttonText: TextStyle;
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
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: scaleSize(1),
    borderRadius: scaleSize(4),
  },
  textInput: {
    width: scaleSize(250),
    color: 'black',
    fontSize: scaleSize(16),
    marginRight: scaleSize(7),
  },
  mainContainer: {
    alignItems: 'center',
  },
  pressContainer: {
    height: scaleSize(25),
    width: scaleSize(25),
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(25 / 2),
  },
  buttonText: {
    color: 'white',
    fontSize: scaleSize(17),
    fontWeight: 'bold',
  },
});

export default styles;
