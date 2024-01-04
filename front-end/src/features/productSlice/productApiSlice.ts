import { PRODUCTS_URL } from "../../constants";

import { apiSlice } from "../apiSclices/apiSclices";

interface Review {
    user: string;
    name: string;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
  }

interface Product {
    _id: string;
    user: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
    reviews: Review[]; // You may want to create a type for reviews if it has a specific structure
    __v: number;
    createdAt: string;
    updatedAt: string;
  }
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor:5
    }),
  }),
});

export const {useGetProductsQuery} = productApiSlice