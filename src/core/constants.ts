import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const WINDOW_DEVICE_WIDTH = width;

const GUIDELINE_BASE_WIDTH = 375;
export const scaleSize = (size: number) => {
  return (WINDOW_DEVICE_WIDTH / GUIDELINE_BASE_WIDTH) * size;
};
