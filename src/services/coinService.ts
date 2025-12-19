import axios from "axios";

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";

const api = axios.create({
  baseURL: COINGECKO_BASE_URL,
});

export const coinService = {
  getCoins: async (
    currency: string,
    perPage: number = 10,
    page: number = 1
  ) => {
    const response = await api.get(`/coins/markets`, {
      params: {
        vs_currency: currency,
        order: "market_cap_desc",
        per_page: perPage,
        page: page,
        sparkline: true,
        price_change_percentage: "24h",
      },
    });
    return response.data;
  },

  getCoinDetails: async (id: string) => {
    const response = await api.get(`/coins/${id}`);
    return response.data;
  },

  getHistoricalData: async (
    id: string,
    days: string = "365",
    currency: string = "usd"
  ) => {
    const response = await api.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: currency,
        days: days,
      },
    });
    return response.data;
  },

  getTrendingCoins: async () => {
    const response = await api.get("/search/trending");
    return response.data;
  },
};
