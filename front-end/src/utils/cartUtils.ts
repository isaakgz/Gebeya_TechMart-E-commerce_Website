export interface CartItem {
  countInStock: number;
  image: string | undefined;
  _id: string;
  name: string;
  price: number;
  qty: number;
}
export interface shippingAddres {
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}
export interface CartState {
  cartItems: CartItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  shippingAdress:shippingAddres
}
export const updateCart = (state: CartState) => {
  // Recalculate the prices
  state.itemsPrice = state.cartItems.reduce(
    (acc: number, item: { price: number; qty: number }) =>
      acc + item.price * item.qty,
    0
  );

  // Shipping price
  state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;

  // Tax price (15%)
  state.taxPrice = state.itemsPrice * 0.15;

  // Total price
  state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;

  // Update the localStorage
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
