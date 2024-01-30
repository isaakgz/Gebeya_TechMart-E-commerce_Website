import { apiSlice } from "../apiSclices/apiSclices";
import { ORDERS_URL } from "../../constants";
import { CartItem, shippingAddress } from "../../utils/cartUtils";


interface Order {
  _id: unknown;
  orderItems: CartItem[];
  shippingAddress: shippingAddress; // Corrected here
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  
}
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, Order>({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: {
          ...order,
          shippingAddress: order.shippingAddress, // Corrected her


          

        }
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
