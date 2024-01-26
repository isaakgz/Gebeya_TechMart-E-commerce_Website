import { apiSlice } from "../apiSclices/apiSclices";
import { ORDERS_URL } from "../../constants";
import { shippingAddres } from "../../utils/cartUtils";

interface Order {
  orderItems: {
    product: string;
    _id: undefined;
  };
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  shippingAdress: shippingAddres;
  paymentMethod: string;
}
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, null>({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: order,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApiSlice;
