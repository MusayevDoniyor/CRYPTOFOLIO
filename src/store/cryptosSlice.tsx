import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cryptos: [],
  loading: "idle",
  error: null,
};

const cryptosSlice = createSlice({
  name: "cryptos",
  initialState,

  reducers: {
    getCryptos: (state) => {
      state.loading = "loading";
    },
    getCryptosSuccess: (state, action) => {
      state.loading = "idle";
      state.cryptos = action.payload;
    },
    getCryptosFailure: (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    },
  },
});

export const { getCryptos, getCryptosSuccess, getCryptosFailure } =
  cryptosSlice.actions;
export default cryptosSlice.reducer;
