import { USERS_URL } from "../../constants";

import { apiSlice } from "../apiSclices/apiSclices";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; user: User },
      { email: string; password: string }
    >({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation<
      { token: string; user: User },
      { name: string; email: string; password: string }
    >({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<void, null>({
      query: () => ({ url: `${USERS_URL}/logout`, method: "POST" }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  userApiSlice;