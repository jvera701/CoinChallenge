import {DetailCoinData} from '@api/api';

export interface Store extends DetailCoinData {
  symbol: string;
}

const initialStore: Store = {
  price_usd: '',
  percent_change_7d: '',
  percent_change_24h: '',
  percent_change_1h: '',
  symbol: '',
};

export default initialStore;
