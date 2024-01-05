import { createSlice } from "@reduxjs/toolkit";

interface cartState {
  cartItems: string[];
}

/// Retrieve the value stored in the "cart" key from localStorage
const storedCart = localStorage.getItem("cart");

// Initialize the initial state for the cart slice
// If there is storedCart data, parse it from a string to an object using JSON.parse
// If storedCart is falsy (e.g., null or undefined), set initialState with an empty cartItem array
const initialState: cartState = storedCart
  ? JSON.parse(storedCart)
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export default cartSlice.reducer;
