import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.coinlore.net/api',
  timeout: 5000,
  timeoutErrorMessage: 'Timeout error',
});

// attributes from api
interface CoinData {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_7d: string;
  percent_change_24h: string;
  percent_change_1h: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
  csupply: string;
  tsupply: string;
  msupply: string;
}

interface GlobalData {
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
}

interface CoinAllData {
  data: CoinData[];
}

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

export {getGlobalData, getAllCoins};
