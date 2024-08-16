export interface Cryptos {
  symbol: string;
  name: string;
  image: { large?: string } | string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export interface CryptosinWatchList {
  image: string;
  symbol: string;
  price_change_percentage_24h: number;
  current_price: number;
  market_cap: number;
}

export interface DrawerProps {
  isOpen: boolean;
  setIsOpen: any;
}
