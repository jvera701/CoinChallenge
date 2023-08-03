import {ViewStyle, StyleSheet} from 'react-native';

interface Styles {
  container: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default styles;
