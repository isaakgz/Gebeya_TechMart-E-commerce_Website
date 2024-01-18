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
  }),
});

export const { useLoginMutation } = userApiSlice;
