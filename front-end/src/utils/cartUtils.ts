
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
  //change the item price to 2 decimal places
  state.itemPrice = Math.round(state.itemPrice * 100) / 100;

  // Shipping price
  state.shippingPrice = state.itemPrice > 100 ? 0 : 10;
  //change the shipping price to 2 decimal places
  state.shippingPrice = Math.round(state.shippingPrice * 100) / 100;

  // Tax price (15%)
  state.taxPrice = state.itemPrice * 0.15;
  //change the tax price to 2 decimal places
  state.taxPrice = Math.round(state.taxPrice * 100) / 100;


  // Total price
  state.totalPrice =(state.itemPrice + state.shippingPrice + state.taxPrice);
//change the totla price to 2 decimal places
  state.totalPrice = Math.round(state.totalPrice * 100) / 100;
  // Update the localStorage
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
