import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CryptosinWatchList } from "../types/Types";

const loadInitialState = (): CryptosinWatchList[] => {
  const storedData = localStorage.getItem("watchingCryptos");
  return storedData ? JSON.parse(storedData) : [];
};

const initialState: CryptosinWatchList[] = loadInitialState();

const watchingCryptosSlice = createSlice({
  name: "watchingCryptos",
  initialState,
  reducers: {
    watchCrypto: (state, action: PayloadAction<any>) => {
      if (!state.some((crypto) => crypto.symbol === action.payload.symbol)) {
        state.push(action.payload);
        localStorage.setItem("watchingCryptos", JSON.stringify(state));
      }
    },
    removeCryptoFromWatchList: (
      state,
      action: PayloadAction<{ symbol: string }>
    ) => {
      const updatedState = state.filter(
        (crypto) => crypto.symbol !== action.payload.symbol
      );
      localStorage.setItem("watchingCryptos", JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const { watchCrypto, removeCryptoFromWatchList } =
  watchingCryptosSlice.actions;
export default watchingCryptosSlice.reducer;
