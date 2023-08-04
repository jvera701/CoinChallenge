import {Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const WINDOW_DEVICE_WIDTH = width;

const GUIDELINE_BASE_WIDTH = 375;
export const scaleSize = (size: number) => {
  return (WINDOW_DEVICE_WIDTH / GUIDELINE_BASE_WIDTH) * size;
};

// taken from https://stackoverflow.com/questions/36734201/how-to-convert-numbers-to-million-in-javascript
// Note: Intl.NumberFormat for compactDisplay doesn't work in react Native/ hermes
// see https://github.com/facebook/hermes/blob/main/lib/Platform/Intl/PlatformIntlApple.mm in line 2463

export const approximate = (num: number) => {
  if (num > 1000000) {
    var units = ['M', 'B', 'T', 'Q'];
    var unit = Math.floor((num / 1.0e1).toFixed(0).toString().length);
    var r = unit % 3;
    var x = Math.abs(Number(num)) / Number('1.0e+' + (unit - r)).toFixed(2);
    return x.toFixed(2) + ' ' + units[Math.floor(unit / 3) - 2];
  } else {
    return Math.round(num);
  }
};
