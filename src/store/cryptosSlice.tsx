import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { coinService } from "../services/coinService";

export const fetchCryptos = createAsyncThunk(
  "cryptos/fetchCryptos",
  async (
    {
      currency,
      perPage,
      page,
    }: { currency: string; perPage: number; page: number },
    thunkAPI
  ) => {
    try {
      const data = await coinService.getCoins(currency, perPage, page);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

const initialState = {
  cryptos: [],
  loading: "idle",
  error: null as string | null,
};

const cryptosSlice = createSlice({
  name: "cryptos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptos.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(fetchCryptos.fulfilled, (state, action) => {
        state.loading = "idle";
        state.cryptos = action.payload;
      })
      .addCase(fetchCryptos.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.payload as string;
      });
  },
});

export default cryptosSlice.reducer;
