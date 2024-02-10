import { apiSlice } from "../apiSclices/apiSclices";
import { ORDERS_URL, PAYPAL_URL } from "../../constants";
import { CartItem, shippingAddress } from "../../utils/cartUtils";

interface Order {
  _id: unknown;
  orderItems: CartItem[];
  shippingAddress: shippingAddress; // Corrected here
  paymentMethod: string;
  itemPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}
interface OrderResponse {
  _id: unknown;
  orderItems: CartItem[];
  shippingAddress: shippingAddress; // Corrected here
  paymentMethod: string;
  itemPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  user: {
    _id: unknown;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  isPaid: boolean;
  paidAt: string;
  isDelivered: boolean;
  deliveredAt: string;
}  
interface PayPalPayment {
  paymentId: string;
  payerId: string;
}
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, Order>({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: {
          ...order,
          shippingAddress: order.shippingAddress, // Corrected here
        },
      }),
    }),
    getordersDetails: builder.query<OrderResponse, string>({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation<OrderResponse, { orderId: string; details: PayPalPayment}>({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: {...details},
      }),
    }),
    getPaypalClientId: builder.query<{ clientId: string }, void>({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query<OrderResponse[], void>({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query<OrderResponse[], void>({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),

  }),
});

export const { useCreateOrderMutation, useGetordersDetailsQuery,usePayOrderMutation, useGetPaypalClientIdQuery  , useGetMyOrdersQuery , useGetOrdersQuery} =
  ordersApiSlice;
