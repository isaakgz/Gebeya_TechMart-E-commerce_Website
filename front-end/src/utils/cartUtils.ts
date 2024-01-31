export interface CartItem {
  product: unknown;
  countInStock: number;
  image: string | undefined;
  _id: string;
  name: string;
  price: number;
  qty: number;
}
export interface shippingAddress {
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}
// export interface PamentMethod{
//   paymentMethod?:string,
 

// }
export interface CartState {
  cartItems: CartItem[];
  itemPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  shippingAdress:shippingAddress;
  paymentMethod:string;

}
export const updateCart = (state: CartState) => {
  // Recalculate the prices
  state.itemPrice = state.cartItems.reduce(
    (acc: number, item: { price: number; qty: number }) =>
      acc + item.price * item.qty,
    0
  );

  // Shipping price
  state.shippingPrice = state.itemPrice > 100 ? 0 : 10;

  // Tax price (15%)
  state.taxPrice = state.itemPrice * 0.15;

  // Total price
  state.totalPrice = state.itemPrice + state.shippingPrice + state.taxPrice;

  // Update the localStorage
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
