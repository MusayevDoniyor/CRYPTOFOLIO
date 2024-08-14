import { configureStore } from "@reduxjs/toolkit";
import cryptosReducer from "./cryptosSlice";
import currencyReducer from "./currencySlice";

const store = configureStore({
  reducer: { cryptosReducer, currencyReducer },
});

export default store;
