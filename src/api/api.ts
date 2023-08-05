import axios from 'axios';
import Config from 'react-native-config';

// All these types are based on the API
const API = axios.create({
  baseURL: Config.API_URL,
  timeout: 5000,
  timeoutErrorMessage: 'Timeout error',
});

// Specific coin data to show in the coin screen and save in store
export type DetailCoinData = {
  price_usd: string;
  percent_change_7d: string;
  percent_change_24h: string;
  percent_change_1h: string;
  symbol: string;
};

interface CoinData extends DetailCoinData {
  name: string;
  id: string;
  nameid: string;
  rank: number;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
  csupply: string;
  tsupply: string;
  msupply: string;
}

type GlobalData = {
  coins_count: number;
  active_markets: number;
  total_mcap: number;
  total_volume: number;
  btc_d: string;
  eth_d: string;
  mcap_change: string;
  volume_change: string;
  avg_change_percent: number;
  volume_ath: number;
  mcap_ath: number;
};

type CoinAllData = {
  data: CoinData[];
};

type SocialData = {
  reddit?: {
    avg_active_users: number | null;
    subscribers: number | null;
  };
  twitter?: {
    followers_count: number | null;
    status_count: number | null;
  };
};

const getGlobalData = async () => {
  try {
    const response = await API.get<GlobalData[]>('/global/');
    return response.data;
  } catch (e) {
    return {
      error: 'Error',
    };
  }
};

const getAllCoins = async (start: number, limit: number) => {
  try {
    const config = {
      params: {
        start: start,
        limit: limit,
      },
    };
    const response = await API.get<CoinAllData>('/tickers/', config);
    return response.data;
  } catch (e) {
    return {
      error: 'Error',
    };
  }
};

const getSocialData = async (id: string) => {
  try {
    const config = {
      params: {
        id: id,
      },
    };
    const response = await API.get<SocialData | ''>(
      '/coin/social_stats/',
      config,
    );
    return response.data;
  } catch (e) {
    return {
      error: 'Error',
    };
  }
};

export {getGlobalData, getAllCoins, getSocialData};
