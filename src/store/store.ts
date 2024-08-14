import { configureStore } from "@reduxjs/toolkit";
import cryptosReducer from "./cryptosSlice";
import currencyReducer from "./currencySlice";
import watchingCryptosReducer from "./watchingCryptosSlice";

const store = configureStore({
  reducer: { cryptosReducer, currencyReducer, watchingCryptosReducer },
});

export default store;
