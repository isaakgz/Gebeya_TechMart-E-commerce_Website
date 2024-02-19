import { PRODUCTS_URL, UPLOADS_URL } from "../../constants";

import { apiSlice } from "../apiSclices/apiSclices";

interface Review {
  _id: null | undefined;
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

interface UploadResult {
  image: string;
  message: string;
}
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<{ products: Product[]; page: number; pages: number }, { pageNumber: number, keyword: string }>({
      query: ({ pageNumber, keyword }) => ({
        url: PRODUCTS_URL,
        params: { pageNumber, keyword },
      }),
      providesTags: [{ type: "Product", id: "LIST" }],
      keepUnusedDataFor: 5,
    }),
    getProductsDetail: builder.query<Product, string>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    creatProduct: builder.mutation<Product, void>({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation<Product, Product>({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    uploadProductImage: builder.mutation<UploadResult, FormData>({
      query: (data) => ({
        url: `${UPLOADS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      // invalidatesTags: [{ type: "Product", id: "LIST" }],
    }), 

    createProductReview: builder.mutation<Product, { productId: string; review: Review }>({
      query: ({ productId, review }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    getTopProducts: builder.query<Product[], void>({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      providesTags: [{ type: "Product", id: "LIST" }],
      keepUnusedDataFor: 5,
    }),


  }),
});

export const {
  useGetProductsQuery,
  useGetProductsDetailQuery,
  useCreatProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateProductReviewMutation,
  useGetTopProductsQuery,
} = productApiSlice;
