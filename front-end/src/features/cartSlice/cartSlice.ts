import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState, updateCart } from "../../utils/cartUtils";





const storedCart = localStorage.getItem("cart");
const initialState: CartState = storedCart
  ? JSON.parse(storedCart)
  : { cartItems: [], itemsPrice: 0, shippingPrice: 0, taxPrice: 0, totalPrice: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find((x) => x._id === newItem._id);

      if (existItem) {
        // If the item already exists in the cart, update its quantity
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...existItem, qty: x.qty + newItem.qty } : x
        );
      } else {
        // If the item is not in the cart, add it
        state.cartItems = [...state.cartItems, newItem];
      }

     return updateCart(state)

      
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
