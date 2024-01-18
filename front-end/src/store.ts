import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/apiSclices/apiSclices";
import  cartReducer from "./features/cartSlice/cartSlice"
import authSliceReducer from "./features/authSlice/authSlice";


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart : cartReducer,
    auth: authSliceReducer 

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
