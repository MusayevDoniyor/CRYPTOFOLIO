export interface Cryptos {
  id: string;
  symbol: string;
  name: string;
  image: { large?: string; small?: string; thumb?: string } | string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  high_24h?: number;
  low_24h?: number;
  total_volume?: number;
  circulating_supply?: number;
  total_supply?: number;
  max_supply?: number;
  fully_diluted_valuation?: number;
  ath?: number;
  atl?: number;
  categories?: string[];
  sentiment_votes_up_percentage?: number;
  sentiment_votes_down_percentage?: number;
  sparkline_in_7d?: { price: number[] };
}

export interface CryptosinWatchList {
  id: string;
  image: string;
  symbol: string;
  name?: string;
  price_change_percentage_24h: number;
  current_price: number;
}

export interface DrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
