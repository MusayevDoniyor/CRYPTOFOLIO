import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CryptosinWatchList } from "../types/Types";

const initialState: CryptosinWatchList[] = JSON.parse(
  localStorage.getItem("watchingCryptos") || "[]"
);

const watchingCryptosSlice = createSlice({
  name: "watchingCryptos",
  initialState,
  reducers: {
    watchCrypto: (state, action: PayloadAction<CryptosinWatchList>) => {
      const newState = [...state, action.payload];
      localStorage.setItem("watchingCryptos", JSON.stringify(newState));
      return newState;
    },

    removeCryptoFromWatchList: (
      state,
      action: PayloadAction<CryptosinWatchList>
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
