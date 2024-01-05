import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  qty: number;
}

interface CartState {
  cartItems: CartItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

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

      // Recalculate the prices
      state.itemsPrice = state.cartItems
        .reduce((acc, item) => acc + item.price * item.qty, 0);

      // Shipping price
      state.shippingPrice = (state.itemsPrice > 100 ? 0 : 10);

      // Tax price (15%)
      state.taxPrice = state.itemsPrice * 0.15;

      // Total price
      state.totalPrice = (state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2);

      // Update the localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
