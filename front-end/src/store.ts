import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSclices/apiSclices";
import  cartReducer from "./features/cartSlice/cartSlice"

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart : cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
