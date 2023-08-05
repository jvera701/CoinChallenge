import {Dimensions, TextStyle} from 'react-native';
const {width} = Dimensions.get('window');
const WINDOW_DEVICE_WIDTH = width;

const GUIDELINE_BASE_WIDTH = 375;
export const scaleSize = (size: number) => {
  return (WINDOW_DEVICE_WIDTH / GUIDELINE_BASE_WIDTH) * size;
};

export const CURRENCY_ROW_HEIGHT = scaleSize(65);

// taken from https://stackoverflow.com/questions/36734201/how-to-convert-numbers-to-million-in-javascript
// Note: Intl.NumberFormat for compactDisplay doesn't work in react Native/ hermes
// see https://github.com/facebook/hermes/blob/main/lib/Platform/Intl/PlatformIntlApple.mm in line 2463

export function approximate(num: number) {
  if (num > 1000000) {
    const units = ['M', 'B', 'T', 'Q'];
    const unit = Math.floor((num / 1.0e1).toFixed(0).toString().length);
    const r = unit % 3;
    const fixedNumerator = parseFloat(Number('1.0e+' + (unit - r)).toFixed(2));
    const x = Math.abs(Number(num)) / fixedNumerator;
    return x.toFixed(2) + ' ' + units[Math.floor(unit / 3) - 2];
  } else {
    return Math.round(num);
  }
}

export function getTextColor(number: string): TextStyle {
  if (number.startsWith('-')) {
    return {
      color: 'red',
    };
  } else {
    return {
      color: 'green',
    };
  }
}

export function getUrl(symbol: string) {
  return `https://assets.coincap.io/assets/icons/${symbol}@2x.png`;
}
